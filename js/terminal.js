const terminalLines = [
  'curl -I https://example.com/api/health  # safe status check example',
  'echo "Sanitized PoC — do not publish live exploit code"',
  'printf "Recon: nmap -sS -p 1-65535 target.example\n"'
];
let currentLineIndex = 0;
const terminalContent = document.getElementById('terminal-content');

function updateTerminalContent() {
  terminalContent.textContent = terminalLines[currentLineIndex];
  currentLineIndex = (currentLineIndex + 2) % terminalLines.length;
}

// Initialize with first line
updateTerminalContent();

// Change line every 2.6 seconds
setInterval(updateTerminalContent, 2600);