import type { SyntaxSheet } from "./types";

export const linux: SyntaxSheet = {
  tagline: "The Linux shell commands you reach for every day on a server.",
  baseline: "Linux (bash)",
  lang: "bash",
  groups: [
    {
      title: "Navigation",
      rows: [
        { syntax: "pwd", what: "Print current directory", example: "pwd" },
        { syntax: "ls -la", what: "List all, long form", example: "ls -la /var/log" },
        { syntax: "cd <dir>", what: "Change directory", example: "cd /etc && cd -   # - = back" },
        { syntax: "cd ~ / cd ..", what: "Home / parent dir", example: "cd ~" },
        { syntax: "tree", what: "Directory tree view", example: "tree -L 2" },
      ],
    },
    {
      title: "Files and directories",
      rows: [
        { syntax: "cat <file>", what: "Print whole file", example: "cat app.log" },
        {
          syntax: "less <file>",
          what: "Page through a file",
          example: "less app.log   # q to quit",
        },
        { syntax: "head -n N <file>", what: "First N lines", example: "head -n 20 data.csv" },
        { syntax: "tail -n N <file>", what: "Last N lines", example: "tail -n 50 app.log" },
        { syntax: "tail -f <file>", what: "Follow a growing log", example: "tail -f app.log" },
        { syntax: "touch <file>", what: "Create empty / update time", example: "touch new.txt" },
        { syntax: "cp <src> <dst>", what: "Copy (use -r for dirs)", example: "cp -r src/ backup/" },
        { syntax: "mv <src> <dst>", what: "Move or rename", example: "mv old.txt new.txt" },
        { syntax: "rm <file>", what: "Delete file", example: "rm temp.txt" },
        {
          syntax: "rm -rf <dir>",
          what: "Delete dir, no prompt (danger)",
          example: "rm -rf build/",
        },
        { syntax: "mkdir -p <path>", what: "Make dirs, parents too", example: "mkdir -p a/b/c" },
      ],
    },
    {
      title: "Search",
      rows: [
        {
          syntax: "find <path> -name <pat>",
          what: "Find files by name",
          example: 'find . -name "*.log"',
        },
        {
          syntax: "find <path> -type f -mtime -1",
          what: "Files changed in last day",
          example: "find /var -type f -mtime -1",
        },
        {
          syntax: "grep -rni <pat> <path>",
          what: "Recursive, line #, no case",
          example: 'grep -rni "error" ./logs',
        },
        { syntax: "grep -v <pat>", what: "Lines NOT matching", example: 'grep -v "DEBUG" app.log' },
        { syntax: "which <cmd>", what: "Path of a command", example: "which python3" },
        { syntax: "locate <name>", what: "Fast name lookup (db)", example: "locate nginx.conf" },
      ],
      combos: [
        {
          label: "Find files, then grep inside them",
          code: `find . -name "*.conf" -print0 \\
  | xargs -0 grep -l "listen 80"
# -> lists config files that contain "listen 80"`,
        },
      ],
    },
    {
      title: "Text processing",
      rows: [
        { syntax: "wc -l <file>", what: "Count lines", example: "wc -l access.log" },
        { syntax: "sort", what: "Sort lines", example: "sort names.txt" },
        { syntax: "uniq -c", what: "Count adjacent dupes", example: "sort x | uniq -c" },
        { syntax: "cut -d, -fN", what: "Pick a column", example: "cut -d, -f1 data.csv" },
        {
          syntax: "sed 's/a/b/g'",
          what: "Find/replace in a stream",
          example: "sed 's/foo/bar/g' in.txt",
        },
        {
          syntax: "awk '{print $N}'",
          what: "Field/column processing",
          example: "awk '{print $1, $3}' data.txt",
        },
        { syntax: "cmd1 | cmd2", what: "Pipe output to input", example: "cat f | grep x | wc -l" },
        {
          syntax: "cmd > file / >>",
          what: "Redirect / append output",
          example: "echo hi > out.txt",
        },
        { syntax: "cmd 2> file", what: "Redirect errors", example: "build 2> errors.log" },
      ],
      combos: [
        {
          label: "Count unique lines, most frequent first",
          code: `sort access.log \\
  | uniq -c \\
  | sort -nr \\
  | head -10
# -> the 10 most common lines with counts`,
        },
      ],
    },
    {
      title: "Permissions and ownership",
      rows: [
        { syntax: "chmod +x <file>", what: "Make executable", example: "chmod +x run.sh" },
        {
          syntax: "chmod 755 <file>",
          what: "rwx owner, rx others",
          example: "chmod 755 script.sh",
        },
        { syntax: "chmod 644 <file>", what: "rw owner, r others", example: "chmod 644 file.txt" },
        {
          syntax: "chown user:group <file>",
          what: "Change owner (use -R for dirs)",
          example: "chown www-data:www-data app/",
        },
        { syntax: "umask", what: "Default new-file permissions", example: "umask 022" },
      ],
    },
    {
      title: "Processes",
      rows: [
        { syntax: "ps aux", what: "All running processes", example: "ps aux | grep java" },
        { syntax: "top", what: "Live process monitor", example: "top   # q to quit" },
        { syntax: "kill <pid>", what: "Ask process to stop", example: "kill 1234" },
        { syntax: "kill -9 <pid>", what: "Force kill (SIGKILL)", example: "kill -9 1234" },
        { syntax: "jobs", what: "Shell background jobs", example: "jobs" },
        { syntax: "bg / fg", what: "Resume job in back/foreground", example: "fg %1" },
        {
          syntax: "nohup <cmd> &",
          what: "Run detached, survives logout",
          example: "nohup ./server &",
        },
      ],
      combos: [
        {
          label: "Find and kill a process by name",
          code: `ps aux | grep '[n]ode'     # find the PID ([n] skips grep itself)
kill <pid>                 # graceful
# or in one shot:
pkill -f "node server.js"`,
        },
      ],
    },
    {
      title: "System and services",
      rows: [
        { syntax: "df -h", what: "Disk space, human-readable", example: "df -h" },
        { syntax: "du -sh <dir>", what: "Size of a folder", example: "du -sh /var/log" },
        { syntax: "free -h", what: "Memory usage", example: "free -h" },
        {
          syntax: "systemctl status <svc>",
          what: "Service state",
          example: "systemctl status nginx",
        },
        {
          syntax: "systemctl start/stop/restart",
          what: "Control a service",
          example: "sudo systemctl restart nginx",
        },
        {
          syntax: "journalctl -u <svc>",
          what: "Service logs",
          example: "journalctl -u nginx -f",
        },
      ],
    },
    {
      title: "Networking",
      rows: [
        {
          syntax: "curl <url>",
          what: "HTTP request",
          example: "curl -s https://api.example.com/health",
        },
        { syntax: "wget <url>", what: "Download a file", example: "wget https://x.com/file.zip" },
        {
          syntax: "ss -tulnp",
          what: "Listening ports + process",
          example: "ss -tulnp | grep 8080",
        },
        { syntax: "ping <host>", what: "Test reachability", example: "ping -c 4 google.com" },
        { syntax: "ssh user@host", what: "Remote shell", example: "ssh deploy@10.0.0.5" },
        {
          syntax: "scp <src> user@host:<dst>",
          what: "Copy over SSH",
          example: "scp app.jar deploy@host:/opt/",
        },
      ],
    },
    {
      title: "Packages",
      rows: [
        {
          syntax: "apt update && apt upgrade",
          what: "Refresh + upgrade (Debian)",
          example: "sudo apt update && sudo apt upgrade",
        },
        {
          syntax: "apt install <pkg>",
          what: "Install (Debian/Ubuntu)",
          example: "sudo apt install nginx",
        },
        {
          syntax: "dnf install <pkg>",
          what: "Install (Fedora/RHEL)",
          example: "sudo dnf install nginx",
        },
        {
          syntax: "apt remove <pkg>",
          what: "Uninstall a package",
          example: "sudo apt remove nginx",
        },
      ],
    },
    {
      title: "Archives",
      rows: [
        {
          syntax: "tar -czf <out> <dir>",
          what: "Create a .tar.gz",
          example: "tar -czf site.tar.gz www/",
        },
        {
          syntax: "tar -xzf <file>",
          what: "Extract a .tar.gz",
          example: "tar -xzf site.tar.gz",
        },
        {
          syntax: "tar -tzf <file>",
          what: "List contents, no extract",
          example: "tar -tzf site.tar.gz",
        },
        { syntax: "zip -r <out> <dir>", what: "Create a .zip", example: "zip -r app.zip app/" },
        { syntax: "unzip <file>", what: "Extract a .zip", example: "unzip app.zip" },
      ],
    },
  ],
};
