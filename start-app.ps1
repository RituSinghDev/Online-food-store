# Start-App.ps1
# This script starts both frontend and backend servers

# Navigate to the project directory (if not already there)
Set-Location -Path $PSScriptRoot

# Start the backend server in a new PowerShell window
Start-Process powershell -ArgumentList "-Command `"cd '$PSScriptRoot'; npm run server`""

# Start the frontend server in the current window
Write-Output "Starting frontend server..."
npm run client 