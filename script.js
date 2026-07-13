const nmapCommands = [
    { category: "target", title: "Single IP Scan", command: "nmap 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up (0.0010s latency).\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http", explanation: "<strong>Basic Scan:</strong> Scans a specific IP address. By default, it scans the top 1000 most common ports." },
    { category: "target", title: "Subnet Scan (CIDR)", command: "nmap 192.168.1.0/24", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up (0.0010s latency).\nNmap done: 256 IP addresses scanned", explanation: "<strong>Subnet Scan:</strong> Scans an entire subnet (256 IPs) using CIDR notation. Great for network mapping." },
    { category: "target", title: "Scan from File", command: "nmap -iL targets.txt", output: "Starting Nmap 7.94\nNmap scan report for 10.0.0.1\nHost is up\nNmap scan report for 10.0.0.5\nHost is up", explanation: "<strong>File Input:</strong> Reads target IPs from a text file. Each IP should be on a new line." },
    { category: "discovery", title: "Ping Scan (No Port Scan)", command: "nmap -sn 192.168.1.0/24", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up (0.0010s latency).\nMAC Address: 00:1A:2B:3C:4D:5E", explanation: "<strong>Ping Scan:</strong> <span class='flag'>-sn</span> Only checks if hosts are alive. Does not scan ports. Perfect for network mapping." },
    { category: "discovery", title: "Skip Ping (Treat All as Up)", command: "nmap -Pn 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up.\nPORT    STATE SERVICE\n22/tcp  open  ssh", explanation: "<strong>Skip Ping:</strong> <span class='flag'>-Pn</span> Skips host discovery. Bypasses firewalls that block ICMP ping requests." },
    { category: "discovery", title: "ARP Ping (Local Network)", command: "nmap -PR 192.168.1.0/24", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up (0.00020s latency).\nMAC Address: 00:1A:2B:3C:4D:5E", explanation: "<strong>ARP Ping:</strong> <span class='flag'>-PR</span> Uses ARP requests. The fastest and most reliable method for local network discovery." },
    { category: "port", title: "TCP SYN Scan (Stealth)", command: "nmap -sS 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http", explanation: "<strong>SYN Stealth Scan:</strong> <span class='flag'>-sS</span> Nmap's default and most popular scan. Creates a half-open connection. Fast, stealthy, requires root." },
    { category: "port", title: "TCP Connect Scan", command: "nmap -sT 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http", explanation: "<strong>TCP Connect:</strong> <span class='flag'>-sT</span> Completes the full TCP 3-way handshake. Used when raw socket access is unavailable (non-root users)." },
    { category: "port", title: "UDP Scan", command: "nmap -sU 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up\nPORT     STATE         SERVICE\n53/udp   open          domain\n161/udp  open          snmp", explanation: "<strong>UDP Scan:</strong> <span class='flag'>-sU</span> Scans UDP ports. Slower than TCP. Crucial for finding DNS, SNMP, and DHCP services." },
    { category: "port", title: "Scan All 65535 Ports", command: "nmap -p- 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nNot shown: 65530 closed ports\nPORT      STATE SERVICE\n22/tcp    open  ssh\n80/tcp    open  http", explanation: "<strong>All Ports:</strong> <span class='flag'>-p-</span> Scans all 65,535 TCP ports. Essential for finding hidden or non-standard services." },
    { category: "port", title: "Fast Scan", command: "nmap -F 192.168.1.1", output: "Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nNot shown: 98 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http", explanation: "<strong>Fast Scan:</strong> <span class='flag'>-F</span> Scans only the top 100 ports. Much faster but with lower coverage." },
    { category: "service", title: "Service Version Detection", command: "nmap -sV 192.168.1.1", output: "Starting Nmap 7.94\nPORT    STATE SERVICE VERSION\n22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp  open  http    Apache httpd 2.4.41", explanation: "<strong>Version Detection:</strong> <span class='flag'>-sV</span> Probes open ports to determine the exact service and version running. Critical for vulnerability assessment." },
    { category: "service", title: "OS Detection", command: "nmap -O 192.168.1.1", output: "Starting Nmap 7.94\nDevice type: general purpose\nRunning: Linux 4.X|5.X\nOS details: Linux 5.0 - 5.4", explanation: "<strong>OS Detection:</strong> <span class='flag'>-O</span> Uses TCP/IP stack fingerprinting to guess the target's Operating System. Requires root privileges." },
    { category: "service", title: "Aggressive Scan (All in One)", command: "nmap -A 192.168.1.1", output: "Starting Nmap 7.94\nPORT    STATE SERVICE VERSION\n22/tcp  open  ssh     OpenSSH 8.2p1\nOS: Linux 5.0 - 5.4\nTRACEROUTE\nHOP RTT     ADDRESS\n1   1.00ms  192.168.1.1", explanation: "<strong>Aggressive:</strong> <span class='flag'>-A</span> Enables OS detection (-O), version detection (-sV), script scanning (-sC), and traceroute simultaneously." },
    { category: "timing", title: "Paranoid (Slowest)", command: "nmap -T0 192.168.1.1", output: "Starting Nmap 7.94 (Paranoid timing)\nNmap scan report for 192.168.1.1\nHost is up\nPORT STATE SERVICE\n22/tcp open ssh", explanation: "<strong>Paranoid:</strong> <span class='flag'>-T0</span> Extremely slow scan. Waits 5 minutes between probes. Used to evade strict IDS/IPS." },
    { category: "timing", title: "Normal (Default)", command: "nmap -T3 192.168.1.1", output: "Starting Nmap 7.94 (Normal timing)\nNmap scan report for 192.168.1.1\nHost is up\nPORT STATE SERVICE\n22/tcp open ssh\n80/tcp open http", explanation: "<strong>Normal:</strong> <span class='flag'>-T3</span> The default timing template. Balanced speed and stealth." },
    { category: "timing", title: "Aggressive (Fast)", command: "nmap -T4 192.168.1.1", output: "Starting Nmap 7.94 (Aggressive timing)\nNmap scan report for 192.168.1.1\nHost is up\nPORT STATE SERVICE\n22/tcp open ssh\n80/tcp open http", explanation: "<strong>Aggressive:</strong> <span class='flag'>-T4</span> Fast scan. Assumes a fast and reliable network. Most commonly used for speed." },
    { category: "scripts", title: "Default Scripts", command: "nmap -sC 192.168.1.1", output: "Starting Nmap 7.94\nPORT   STATE SERVICE\n22/tcp open  ssh\n| ssh-hostkey:\n| 2048 aa:bb:cc:dd (RSA)\n80/tcp open  http\n|_http-title: Welcome to Apache", explanation: "<strong>Default Scripts:</strong> <span class='flag'>-sC</span> Runs the default script category. Safe and provides useful information." },
    { category: "scripts", title: "Vulnerability Scripts", command: "nmap --script=vuln 192.168.1.1", output: "Starting Nmap 7.94\nPORT   STATE SERVICE\n80/tcp open  http\n|_http-vuln-cve2017-5638: VULNERABLE", explanation: "<strong>Vulnerability:</strong> <span class='flag'>--script=vuln</span> Runs scripts that check for known vulnerabilities (CVEs) on the target." },
    { category: "scripts", title: "SMB Vulnerability (EternalBlue)", command: "nmap -p 445 --script=smb-vuln-ms17-010 192.168.1.1", output: "Starting Nmap 7.94\nPORT    STATE SERVICE\n445/tcp open  microsoft-ds\n|_smb-vuln-ms17-010: VULNERABLE - EternalBlue", explanation: "<strong>SMB Vuln:</strong> Specifically checks for the infamous MS17-010 (EternalBlue) vulnerability." },
    { category: "output", title: "Normal Output", command: "nmap -oN output.txt 192.168.1.1", output: "Starting Nmap 7.94\nSaved to output.txt", explanation: "<strong>Normal:</strong> <span class='flag'>-oN</span> Saves the output in a standard, human-readable text format." },
    { category: "output", title: "All Formats", command: "nmap -oA scan_results 192.168.1.1", output: "Starting Nmap 7.94\nSaved to:\n- scan_results.nmap\n- scan_results.xml\n- scan_results.gnmap", explanation: "<strong>All Formats:</strong> <span class='flag'>-oA</span> Saves the scan results in all three major formats simultaneously. Highly recommended." },
    { category: "evasion", title: "Decoy Scan", command: "nmap -D RND:10 192.168.1.1", output: "Starting Nmap 7.94\nScanning with 10 decoys\nNmap scan report for 192.168.1.1", explanation: "<strong>Decoy:</strong> <span class='flag'>-D</span> Uses fake source IPs to hide your real IP. RND:10 generates 10 random decoy IPs." },
    { category: "evasion", title: "Spoof MAC Address", command: "nmap --spoof-mac 00:11:22:33:44:55 192.168.1.1", output: "Starting Nmap 7.94\nSpoofing MAC address to 00:11:22:33:44:55", explanation: "<strong>Spoof MAC:</strong> <span class='flag'>--spoof-mac</span> Spoofs the MAC address. Use '0' or 'random' to generate a random MAC." }
];

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    renderCommands(nmapCommands);
    updateStats();
    setupEventListeners();
    setupFakeTerminal();
});

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

function renderCommands(commands) {
    const container = document.getElementById('commandsContainer');
    container.innerHTML = '';

    const categories = {
        target: '🎯 Target Specification', discovery: '🔍 Host Discovery', port: '🚪 Port Scanning',
        service: '⚙️ Service & OS Detection', timing: '⚡ Timing & Performance',
        scripts: '📜 NSE Scripts', output: '📊 Output Formats', evasion: '🛡️ Firewall/IDS Evasion'
    };

    const grouped = commands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {});

    Object.keys(grouped).forEach(category => {
        const section = document.createElement('div');
        section.className = 'category-section';
        const title = document.createElement('div');
        title.className = 'category-title';
        title.innerHTML = `${categories[category] || '📌 ' + category}`;
        const grid = document.createElement('div');
        grid.className = 'cards-grid';

        grouped[category].forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.dataset.category = cmd.category;
            card.dataset.command = cmd.command.toLowerCase();
            card.dataset.title = cmd.title.toLowerCase();
            card.dataset.explanation = cmd.explanation.toLowerCase();

            card.innerHTML = `
                <button class="copy-btn" onclick="copyCommand('${cmd.command.replace(/'/g, "\\'")}')">📋 Copy</button>
                <div class="card-header">
                    <div class="card-title">${cmd.title}</div>
                    <div class="command-badge">${cmd.category.toUpperCase()}</div>
                </div>
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-btn red"></div><div class="terminal-btn yellow"></div><div class="terminal-btn green"></div>
                        <div class="terminal-title">root@sayanox:~#</div>
                    </div>
                    <div class="terminal-body">
                        <div class="command-line"><span class="prompt">root@sayanox:~#</span> <span class="cmd">${cmd.command}</span></div>
                        <div class="output">${cmd.output}</div>
                    </div>
                </div>
                <div class="explanation">${cmd.explanation}</div>
            `;
            grid.appendChild(card);
        });

        section.appendChild(title);
        section.appendChild(grid);
        container.appendChild(section);
    });

    setup3DTilt();
}

function copyCommand(cmd) {
    navigator.clipboard.writeText(cmd).then(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `position: fixed; top: 80px; right: 20px; background: var(--neon-green); color: #000; padding: 15px 25px; border-radius: 10px; font-weight: bold; z-index: 10000; box-shadow: 0 0 20px var(--neon-green); font-family: 'Share Tech Mono'; animation: slideIn 0.3s ease;`;
        notification.textContent = '✅ Command copied to clipboard!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    });
}

function setup3DTilt() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

function updateStats() {
    document.getElementById('totalCommands').textContent = nmapCommands.length;
    const uniqueCategories = [...new Set(nmapCommands.map(cmd => cmd.category))];
    document.getElementById('totalCategories').textContent = uniqueCategories.length;
}

let activeCategory = 'all';
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => filterCommands(e.target.value.toLowerCase(), activeCategory));

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            filterCommands(searchInput.value.toLowerCase(), activeCategory);
        });
    });
}

function filterCommands(searchTerm, category) {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const matchesSearch = card.dataset.command.includes(searchTerm) || card.dataset.title.includes(searchTerm) || card.dataset.explanation.includes(searchTerm);
        const matchesCategory = category === 'all' || card.dataset.category === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else {
            card.style.opacity = '0'; card.style.transform = 'scale(0.8)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
        }
    });
}

function setupFakeTerminal() {
    const input = document.getElementById('fakeTerminalInput');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if(val) {
                document.getElementById('searchInput').value = val;
                document.getElementById('searchInput').dispatchEvent(new Event('input'));
                document.getElementById('commands').scrollIntoView({ behavior: 'smooth' });
                input.value = '';
            }
        }
    });
}

const style = document.createElement('style');
style.textContent = `@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
document.head.appendChild(style);
