php artisan serve$ErrorActionPreference = 'Stop'

$taskDockerCommand = Get-Command docker -ErrorAction SilentlyContinue
if ($taskDockerCommand) {
    $taskDocker = $taskDockerCommand.Source
} else {
    $taskDocker = Join-Path $env:LOCALAPPDATA 'Programs\DockerDesktop\resources\bin\docker.exe'
    if (-not (Test-Path -LiteralPath $taskDocker)) {
        $taskDocker = Join-Path $env:ProgramFiles 'Docker\Docker\resources\bin\docker.exe'
    }
}
if (-not (Test-Path -LiteralPath $taskDocker)) {
    throw 'Docker est introuvable. Installez Docker Desktop puis relancez le terminal.'
}
$env:Path = [System.IO.Path]::GetDirectoryName($taskDocker) + [System.IO.Path]::PathSeparator + $env:Path
& $taskDocker info --format '{{.ServerVersion}}' | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw 'Ouvrez Docker Desktop et attendez que le moteur soit prêt.'
}

$taskEnvironment = Join-Path $PSScriptRoot '.env.docker'
if (-not (Test-Path -LiteralPath $taskEnvironment)) {
    $taskRandom = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $taskKeyBytes = New-Object byte[] 32
        $taskPasswordBytes = New-Object byte[] 24
        $taskRandom.GetBytes($taskKeyBytes)
        $taskRandom.GetBytes($taskPasswordBytes)
        $taskKey = [Convert]::ToBase64String($taskKeyBytes)
        $taskPassword = [BitConverter]::ToString($taskPasswordBytes).Replace('-', '').ToLowerInvariant()
        $taskContents = "LOCAL_APP_KEY=base64:$taskKey`nLOCAL_DB_PASSWORD=$taskPassword`n"
        [System.IO.File]::WriteAllText($taskEnvironment, $taskContents, [System.Text.UTF8Encoding]::new($false))
    } finally {
        $taskRandom.Dispose()
    }
}

foreach ($taskService in @('backend', 'frontend')) {
    & $taskDocker compose --env-file $taskEnvironment -f (Join-Path $PSScriptRoot 'compose.local.yaml') build $taskService
    if ($LASTEXITCODE -ne 0) {
        throw "La construction du service $taskService a échoué. Consultez les messages Docker ci-dessus."
    }
}
& $taskDocker compose --env-file $taskEnvironment -f (Join-Path $PSScriptRoot 'compose.local.yaml') up -d --no-build --wait --wait-timeout 300
if ($LASTEXITCODE -ne 0) {
    throw 'Le démarrage a échoué. Consultez les messages Docker ci-dessus.'
}
& $taskDocker compose --env-file $taskEnvironment -f (Join-Path $PSScriptRoot 'compose.local.yaml') exec -T --user root backend chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
if ($LASTEXITCODE -ne 0) {
    throw 'Les droits des fichiers locaux ne sont pas prêts.'
}
$taskDemoOutput = & $taskDocker compose --env-file $taskEnvironment -f (Join-Path $PSScriptRoot 'compose.local.yaml') exec -T --user www-data backend php artisan school:demo --slug=demo-docker --no-interaction
if ($LASTEXITCODE -ne 0) {
    throw "Les conteneurs sont démarrés, mais la création de l’école fictive a échoué."
}
$taskDemoOutput = $taskDemoOutput | ForEach-Object { [regex]::Replace([string]$_, '\x1B\[[0-?]*[ -/]*[@-~]', '').Trim() }
$taskDemoPasswordLine = $taskDemoOutput | Where-Object { $_ -match 'Mot de passe [^:]+:' } | Select-Object -First 1
$taskDemoCredentials = Join-Path $PSScriptRoot '.env.docker-demo'
if ($taskDemoPasswordLine) {
    $taskDemoPassword = ($taskDemoPasswordLine -replace '^.*?Mot de passe [^:]+:\s*', '').Trim()
    $taskDemoContents = "SCHOOL_CODE=demo-docker`nLOGIN=director.demo`nPASSWORD=$taskDemoPassword`n"
    [System.IO.File]::WriteAllText($taskDemoCredentials, $taskDemoContents, [System.Text.UTF8Encoding]::new($false))
}
if (-not (Test-Path -LiteralPath $taskDemoCredentials)) {
    throw "L’école fictive existe mais son fichier d’identifiants est absent. Les mots de passe existants ont été conservés."
}
Write-Host 'Application : http://localhost:8080'
Write-Host 'Connexion de test : http://localhost:8080/connexion?school=demo-docker'
Write-Host 'Comptes fictifs : director.demo, secretary.demo, teacher.demo, parent.demo, accountant.demo, admin.demo'
if (Test-Path -LiteralPath $taskDemoCredentials) {
    Write-Host 'Mot de passe local : ouvrez .env.docker-demo (ce fichier est ignoré par Git).'
}
Write-Host 'Dans Docker Desktop, ouvrez le groupe carnet-v2-local.'
