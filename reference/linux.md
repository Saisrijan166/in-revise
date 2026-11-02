# LINUX — Interview Reference (owner input)

> Split from the owner's combined GIT & LINUX reference (root reference.md). Input only; every fact is verified against a primary source before it reaches the site.

# PART 2: LINUX

## 1. Linux Fundamentals

### Basic Terminology

- Linux: An open-source operating system kernel.
- Linux Distribution (Distro): An operating system built around the Linux kernel, such as Ubuntu, Fedora or Debian.
- Kernel: Core component that manages hardware, memory, processes and devices.
- Shell: Program that accepts and executes commands.
- Terminal: Interface where you interact with a shell.
- Bash: A popular command-line shell.
- CLI: Command Line Interface.
- GUI: Graphical User Interface.
- Root User: Administrator account with full system privileges.
- Home Directory: Personal directory of a user.
- File System: Organizes how files and directories are stored.
- Process: A running instance of a program.
- Daemon: Background service that runs without direct user interaction.
- PID: Process ID, a unique identifier for a running process.
- Environment Variable: A variable available to processes, such as `PATH`.

### Linux Architecture

User Applications

Java, Browser, Docker, etc.

Shell / System Libraries

Bash, libraries, system tools

Linux Kernel

CPU, memory, processes, devices

Hardware

CPU, RAM, disk, network

### Example

```
whoami
uname -a
pwd
```

## 2. Linux File System Structure

Linux uses a hierarchical directory structure starting from `/`.

### Important Directories

| Directory  | Purpose                                                |
| ---------- | ------------------------------------------------------ |
| `/`        | Root of the filesystem                                 |
| `/home`    | User home directories                                  |
| `/root`    | Root user's home directory                             |
| `/etc`     | System configuration files                             |
| `/var`     | Logs and changing application data                     |
| `/var/log` | System and application logs                            |
| `/tmp`     | Temporary files                                        |
| `/usr`     | User applications, libraries and utilities             |
| `/bin`     | Essential user commands                                |
| `/sbin`    | System administration commands                         |
| `/opt`     | Optional third-party applications                      |
| `/dev`     | Device files                                           |
| `/proc`    | Virtual filesystem with process and kernel information |
| `/sys`     | Kernel and device information                          |
| `/mnt`     | Temporary mount point                                  |
| `/media`   | Removable media mount points                           |

### Important Terminology

- Absolute Path: Full path starting from `/`.
- Relative Path: Path based on the current directory.
- Root Directory: `/`, the top-level directory.
- Home Directory: Usually `/home/username`.
- Current Directory: Directory where you are currently working.

### Example

```
# Absolute path
cd /home/srijan/Documents

# Relative path
cd Documents

# Go to home
cd ~

# Go to root
cd /

# Current directory
pwd
```

### Important Symbols

| Symbol | Meaning                         |
| ------ | ------------------------------- |
| `/`    | Root directory / path separator |
| `~`    | Current user's home             |
| `.`    | Current directory               |
| `..`   | Parent directory                |
| `-`    | Previous directory in `cd -`    |
| `*`    | Matches zero or more characters |
| `?`    | Matches one character           |

## 3. Basic Navigation Commands

### Important Commands

| Command     | Purpose                                 |
| ----------- | --------------------------------------- |
| `pwd`       | Print current directory                 |
| `ls`        | List files and folders                  |
| `ls -l`     | Detailed listing                        |
| `ls -a`     | Show hidden files                       |
| `ls -la`    | Detailed listing including hidden files |
| `cd folder` | Enter a directory                       |
| `cd ..`     | Go one directory up                     |
| `cd ~`      | Go to home directory                    |
| `cd -`      | Return to previous directory            |
| `clear`     | Clear terminal                          |
| `history`   | Show previous commands                  |
| `whoami`    | Show current username                   |
| `hostname`  | Show system hostname                    |
| `date`      | Show current date and time              |
| `uname -a`  | Show kernel/system information          |

### Example

```
pwd
ls -la
cd Documents
cd ..
cd -
```

### Important Rules

- Hidden files usually start with `.`.
- `ls -a` displays hidden files.
- `ls -l` displays permissions, owner, group, size and modification time.
- Linux paths are case-sensitive.

## 4. File & Directory Operations

### Important Commands

| Command          | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `touch file.txt` | Create an empty file or update timestamps |
| `mkdir folder`   | Create directory                          |
| `mkdir -p a/b/c` | Create nested directories                 |
| `rmdir folder`   | Remove an empty directory                 |
| `rm file.txt`    | Delete a file                             |
| `rm -r folder`   | Delete directory recursively              |
| `rm -rf folder`  | Forcefully delete recursively             |
| `cp a.txt b.txt` | Copy file                                 |
| `cp -r a b`      | Copy directory recursively                |
| `mv old new`     | Move or rename                            |
| `file name`      | Identify file type                        |

### Example

```
mkdir project
cd project

touch Main.java

cp Main.java Backup.java

mv Backup.java OldMain.java

rm OldMain.java
```

### Important Rules

- `mkdir -p` creates parent directories if necessary.
- `rmdir` only removes empty directories.
- `rm -r` can remove non-empty directories.
- `rm -rf` is dangerous because it does not ask for confirmation by default.
- `mv` is used for both moving and renaming.

## 5. Reading & Editing Files

### Important Commands

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `cat file`        | Display complete file        |
| `less file`       | Read file page by page       |
| `more file`       | Basic page-by-page reading   |
| `head file`       | First 10 lines               |
| `head -n 5 file`  | First 5 lines                |
| `tail file`       | Last 10 lines                |
| `tail -n 20 file` | Last 20 lines                |
| `tail -f file`    | Follow new log entries       |
| `nano file`       | Open simple terminal editor  |
| `vim file`        | Open Vim editor              |
| `wc file`         | Count lines, words and bytes |

### Example

```
cat application.log

head -n 5 application.log

tail -n 20 application.log

tail -f application.log
```

### Important Interview Point

`tail -f` is frequently used to monitor application logs in real time.

Example:

```
tail -f /var/log/syslog
```

## 6. Linux Permissions

Very important interview topic

### Terminology

- Permission: Controls what users can do with files and directories.
- Owner: User who owns a file.
- Group: Group associated with a file.
- Others: Everyone else.
- Read (r): Permission to read a file.
- Write (w): Permission to modify a file.
- Execute (x): Permission to execute a file or traverse a directory.
- chmod: Changes permissions.
- chown: Changes file ownership.
- chgrp: Changes group ownership.
- sudo: Runs a command with elevated privileges.

### Permission Structure

Example:

```
-rwxr-xr--
```

# -rwxr-xr--

\-

File type

rwx

Owner

r-x

Group

r--

Others

### Permission Numeric Values

| Permission  | Value |
| ----------- | ----- |
| Read (r)    | 4     |
| Write (w)   | 2     |
| Execute (x) | 1     |
| None        | 0     |

Add the values together to get the permission number.

| Number | Permission |
| ------ | ---------- |
| 7      | rwx        |
| 6      | rw-        |
| 5      | r-x        |
| 4      | r--        |
| 3      | -wx        |
| 2      | -w-        |
| 1      | --x        |
| 0      | ---        |

### chmod Examples

```
# Owner: rwx, Group: r-x, Others: r-x
chmod 755 script.sh

# Owner: rw-, Group: rw-, Others: r--
chmod 664 file.txt

# Owner only can read and write
chmod 600 secret.txt
```

### Symbolic Permissions

```
chmod u+x script.sh
chmod g-w file.txt
chmod o+r file.txt
chmod a+x script.sh
```

- `u` → Owner/user.
- `g` → Group.
- `o` → Others.
- `a` → All.

### chown Example

```
sudo chown srijan file.txt

sudo chown srijan:developers file.txt

sudo chown -R srijan:developers project/
```

### Important Rules

- `755` → Owner gets full permission; group and others get read and execute.
- `644` → Owner gets read/write; group and others get read.
- `600` → Only owner gets read/write.
- A directory needs execute permission to enter or traverse it.
- Write permission on a directory controls creating, deleting and renaming entries inside it, subject to other restrictions.
- `sudo` is not the same as logging in as root.

### chmod vs chown

- `chmod` → Changes permissions.
- `chown` → Changes owner.

## 7. Linux Users & Groups

### Terminology

- User: Account used to access the system.
- Group: Collection of users sharing permissions.
- Root: Administrator account, usually UID 0.
- UID: User ID.
- GID: Group ID.
- sudo: Allows authorized users to execute commands with elevated privileges.
- su: Switches to another user account.

### Important Commands

```
# Current user
whoami

# Current user and group IDs
id

# Show users
cat /etc/passwd

# Show groups
cat /etc/group

# Switch user
su username

# Run as administrator
sudo command

# Add user
sudo adduser srijan

# Change password
passwd
```

### Important Files

- `/etc/passwd` → User account information.
- `/etc/shadow` → Password hashes and password aging information; access is restricted.
- `/etc/group` → Group information.
- `/etc/sudoers` → Sudo permissions and rules.

## 8. Searching Files & Text

### Important Commands

| Command   | Purpose                                  |
| --------- | ---------------------------------------- |
| `find`    | Search files and directories             |
| `grep`    | Search text patterns                     |
| `grep -i` | Case-insensitive search                  |
| `grep -r` | Search recursively                       |
| `grep -n` | Show matching line numbers               |
| `grep -v` | Show non-matching lines                  |
| `locate`  | Search using a file database             |
| `which`   | Show executable path                     |
| `whereis` | Find binary, source and manual locations |

### find Examples

```
# Find a file by name
find . -name "Main.java"

# Find all Java files
find . -name "*.java"

# Find directories
find . -type d

# Find files
find . -type f

# Find files larger than 100 MB
find . -type f -size +100M
```

### grep Examples

```
# Search text
grep "ERROR" app.log

# Ignore case
grep -i "error" app.log

# Search recursively
grep -r "TODO" .

# Show line numbers
grep -n "ERROR" app.log

# Search in multiple files
grep -r "database" /var/log/
```

### find vs grep

| find                            | grep                            |
| ------------------------------- | ------------------------------- |
| Searches files/directories      | Searches text content           |
| Finds by name, type, size, etc. | Finds matching text or patterns |

## 9. Linux Pipes & Redirection

### Terminology

- Standard Input (stdin): Input stream, normally keyboard (FD 0).
- Standard Output (stdout): Normal output stream (FD 1).
- Standard Error (stderr): Error output stream (FD 2).
- Pipe (`|`): Sends one command's output to another command.
- Redirection: Sends input or output to a file or another destination.

### Important Operators

| Operator | Meaning                         |
| -------- | ------------------------------- |
| `>`      | Redirect output, overwrite file |
| `>>`     | Append output                   |
| `<`      | Read input from file            |
| `2>`     | Redirect errors                 |
| `2>>`    | Append errors                   |
| `2>&1`   | Redirect stderr to stdout       |
| `\\|`    | Pipe output to next command     |

### Examples

```
# Overwrite file
echo "Hello" > file.txt

# Append to file
echo "World" >> file.txt

# Read file as input
sort < names.txt

# Redirect errors
command 2> error.log

# Redirect output and errors
command > output.log 2>&1

# Pipe
cat app.log | grep ERROR
```

### Important Difference

- `>` overwrites.
- `>>` appends.
- `|` connects commands.
- `2>` redirects errors, not normal output.

### Useful Example

```
ps aux | grep java
```

This lists processes and filters the output for Java.

## 10. Linux Process Management

Very important for developers

### Terminology

- Process: Running program.
- PID: Process ID.
- PPID: Parent Process ID.
- Foreground Process: Runs interactively in the terminal.
- Background Process: Runs without occupying the terminal.
- Zombie Process: A terminated process whose exit status has not yet been collected by its parent.
- Daemon: Background service.
- Signal: Message sent to a process to control or notify it.

### Important Commands

| Command       | Purpose                                       |
| ------------- | --------------------------------------------- |
| `ps`          | Show processes                                |
| `ps aux`      | Show detailed process list                    |
| `top`         | Live process monitoring                       |
| `htop`        | Interactive process monitoring (if installed) |
| `pgrep java`  | Find process IDs by name                      |
| `kill PID`    | Send default termination signal               |
| `kill -9 PID` | Forcefully terminate process                  |
| `pkill java`  | Kill processes by name                        |
| `jobs`        | Show current shell's background jobs          |
| `bg`          | Resume job in background                      |
| `fg`          | Bring job to foreground                       |
| `nohup`       | Keep a command running after terminal logout  |

### Example

```
# Find Java processes
ps aux | grep java

# Find process ID
pgrep java

# Stop process gracefully
kill 1234

# Force kill
kill -9 1234

# Run in background
java Main.java &
```

### Important Signals

| Signal  | Number | Meaning                      |
| ------- | ------ | ---------------------------- |
| SIGHUP  | 1      | Hangup                       |
| SIGINT  | 2      | Interrupt (usually Ctrl+C)   |
| SIGKILL | 9      | Force kill                   |
| SIGTERM | 15     | Request graceful termination |
| SIGSTOP | 19     | Stop process                 |

### Important Rules

- `kill` sends a signal; it does not always mean terminate.
- Default `kill PID` sends SIGTERM (15).
- SIGTERM allows a process to clean up before exiting.
- SIGKILL cannot be caught or ignored by the process.
- Prefer `kill` before `kill -9`.
- `Ctrl+C` normally sends SIGINT to the foreground process.
- `&` starts a command in the background.

## 11. Linux Package Management

### Terminology

- Package: Software bundled for installation.
- Package Manager: Tool used to install, update and remove software.
- Repository: Server or source containing software packages.
- Dependency: Another package required by software.
- APT: Package manager commonly used on Ubuntu/Debian.
- DNF: Package manager used on modern Fedora systems.
- RPM: Package format and package-management tool used in RPM-based distributions.

### Ubuntu / Debian Commands

```
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade

# Install package
sudo apt install nginx

# Remove package
sudo apt remove nginx

# Remove package and configuration
sudo apt purge nginx

# Remove unused dependencies
sudo apt autoremove
```

### Important Differences

- `apt update` → Refreshes available package information.
- `apt upgrade` → Installs available updates.
- `apt install` → Installs a package.
- `apt remove` → Removes software but generally leaves configuration files.
- `apt purge` → Removes software and its system configuration files.

### Other Distributions

```
# Fedora
sudo dnf install nginx

# Older RPM-based systems
sudo yum install nginx
```

## 12. Linux Networking Commands

### Important Terminology

- IP Address: Identifies a device/interface on a network.
- Port: Identifies a service or application endpoint.
- DNS: Converts domain names into IP addresses.
- Localhost: Refers to the local machine, usually `127.0.0.1` for IPv4.
- SSH: Secure protocol for remote login.
- HTTP: Protocol for web communication.
- HTTPS: HTTP secured using TLS.
- Firewall: Controls network traffic based on rules.
- Socket: Communication endpoint identified by address and port (for TCP/UDP networking).

### Important Commands

| Command      | Purpose                                |
| ------------ | -------------------------------------- |
| `ip addr`    | Show IP addresses                      |
| `ip route`   | Show routing table                     |
| `ping`       | Test network reachability              |
| `curl`       | Send HTTP and other supported requests |
| `wget`       | Download files                         |
| `ss -tulnp`  | Show listening sockets and processes   |
| `netstat`    | Older network inspection command       |
| `nslookup`   | Check DNS resolution                   |
| `dig`        | Detailed DNS lookup                    |
| `ssh`        | Connect to remote machine              |
| `scp`        | Copy files over SSH                    |
| `traceroute` | Show network path to destination       |

### Examples

```
# Check IP address
ip addr

# Test connectivity
ping google.com

# Make HTTP request
curl https://example.com

# Check port listeners
sudo ss -tulnp

# DNS lookup
nslookup google.com

# SSH login
ssh user@server-ip

# Copy file to server
scp app.jar user@server-ip:/home/user/
```

### Important Port Numbers

| Port | Service                                  |
| ---- | ---------------------------------------- |
| 22   | SSH                                      |
| 53   | DNS                                      |
| 80   | HTTP                                     |
| 443  | HTTPS                                    |
| 3306 | MySQL                                    |
| 5432 | PostgreSQL                               |
| 6379 | Redis                                    |
| 8080 | Common alternative HTTP/application port |

### Important Rules

- An IP address identifies a network interface.
- A port identifies an application/service endpoint.
- Ports below 1024 are traditionally privileged ports on Linux.
- `localhost` points to your own machine, not another server.
- `ping` uses ICMP; a server can block ping while its HTTP service is working.

## 13. Linux Environment Variables

### Terminology

- Environment Variable: Named value available to processes.
- PATH: List of directories where the shell searches for executable commands.
- HOME: Current user's home directory.
- USER: Current username in many shell environments.
- PWD: Current working directory.
- Export: Makes a shell variable available to child processes as an environment variable.

### Examples

```
# View variable
echo $HOME

# View PATH
echo $PATH

# Create variable
NAME="Srijan"

# Export variable
export NAME="Srijan"

# Remove variable
unset NAME
```

### Important Rules

- `$` is used to access a variable's value.
- `export` makes the variable available to child processes.
- Variables set in a shell are not automatically permanent.
- To persist shell variables, configure files such as `~/.bashrc` or `~/.profile`, depending on the environment.

## 14. Linux Services & System Monitoring

### Terminology

- Service: Background program providing functionality.
- systemd: Common Linux system and service manager.
- systemctl: Command used to manage systemd services.
- journalctl: Reads logs collected by systemd's journal.
- Uptime: How long the system has been running.
- Load Average: Average system load over 1, 5 and 15 minutes.
- Disk Usage: Amount of disk space used.
- Memory Usage: RAM currently used and available.

### Important Commands

```
# Check service status
systemctl status nginx

# Start service
sudo systemctl start nginx

# Stop service
sudo systemctl stop nginx

# Restart service
sudo systemctl restart nginx

# Enable service at startup
sudo systemctl enable nginx

# Disable startup
sudo systemctl disable nginx

# View logs
journalctl -u nginx

# View recent logs
journalctl -u nginx -n 50
```

### System Monitoring

```
# Memory
free -h

# Disk space
df -h

# Directory size
du -sh folder/

# System uptime
uptime

# CPU/process monitoring
top

# Block devices
lsblk
```

### Important Differences

| Command         | Purpose                          |
| --------------- | -------------------------------- |
| `df -h`         | Shows filesystem disk usage      |
| `du -sh folder` | Shows space used by a folder     |
| `free -h`       | Shows memory usage               |
| `top`           | Shows processes and system usage |
| `uptime`        | Shows uptime and load average    |

### Start vs Enable

- `start` → Starts service now.
- `enable` → Configures service to start automatically during boot.
- `restart` → Stops and starts service.
- `reload` → Asks service to reload its configuration, if supported.

## 15. Linux Archives & Compression

### Terminology

- Archive: Collection of files packaged together.
- Compression: Reduces file size.
- tar: Tool for creating and extracting archives.
- gzip: Compression utility.
- zip: Creates ZIP archives.
- unzip: Extracts ZIP archives.

### Important Commands

```
# Create tar archive
tar -cvf backup.tar folder/

# Extract tar archive
tar -xvf backup.tar

# Create compressed tar.gz
tar -czvf backup.tar.gz folder/

# Extract tar.gz
tar -xzvf backup.tar.gz

# Create zip
zip -r backup.zip folder/

# Extract zip
unzip backup.zip
```

### Remember tar Options

| Option | Meaning               |
| ------ | --------------------- |
| `c`    | Create                |
| `x`    | Extract               |
| `v`    | Verbose               |
| `f`    | File                  |
| `z`    | gzip compression      |
| `t`    | List archive contents |

## 16. Linux Scheduling & Background Jobs

### Terminology

- Cron: Scheduler for recurring tasks.
- Crontab: Configuration containing scheduled cron jobs.
- Cron Job: Command executed according to a schedule.
- Background Job: Command running without occupying the terminal.
- nohup: Allows a command to continue after terminal logout.

### Cron Format

```
* * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week
│ │ │ └──── Month
│ │ └────── Day of month
│ └──────── Hour
└────────── Minute
```

### Examples

```
# Edit cron jobs
crontab -e

# List cron jobs
crontab -l

# Run every minute
* * * * * echo "Hello"

# Run every day at 9 AM
0 9 * * * /home/srijan/backup.sh
```

### nohup Example

```
nohup java -jar app.jar > app.log 2>&1 &
```

This starts the application in the background and redirects output and errors to a log file.

## 17. Linux Important Shortcuts

| Shortcut   | Purpose                                    |
| ---------- | ------------------------------------------ |
| `Ctrl + C` | Interrupt foreground command               |
| `Ctrl + Z` | Suspend foreground process                 |
| `Ctrl + D` | Send EOF / exit shell in common situations |
| `Ctrl + L` | Clear terminal screen                      |
| `Ctrl + A` | Move to beginning of command line          |
| `Ctrl + E` | Move to end of command line                |
| `Ctrl + R` | Search command history                     |
| `Tab`      | Auto-complete                              |
| `!!`       | Repeat previous command                    |
| `history`  | Show command history                       |

## 18. Linux Important Interview Questions

1\. What is Linux?

Linux is an open-source operating system kernel used by many operating systems and servers.

2\. What is the difference between Linux and Unix?

Unix is an older family of operating systems. Linux is a Unix-like, open-source kernel and operating system ecosystem.

3\. What is a kernel?

The kernel is the core of the operating system that manages CPU, memory, processes and hardware.

4\. What is a shell?

A shell is a program that accepts commands from users and executes them.

5\. What is Bash?

Bash is a popular command-line shell used in Linux.

6\. What is root?

Root is the administrator account with UID 0 and extensive system privileges.

7\. What is sudo?

Sudo allows an authorized user to execute commands with elevated privileges.

8\. What is a process?

A process is a running instance of a program.

9\. What is a daemon?

A daemon is a background service that usually runs without direct user interaction.

10\. What is the difference between `kill` and `kill -9`?

`kill` sends SIGTERM by default, allowing graceful termination. `kill -9` sends SIGKILL and forcefully terminates the process.

11\. What is the difference between `df` and `du`?

`df` shows filesystem disk usage, while `du` shows space used by files and directories.

12\. What is chmod?

Chmod changes file and directory permissions.

13\. What is the difference between 755 and 644?

755 gives the owner read, write and execute permissions, while group and others get read and execute. 644 gives the owner read/write and others read-only.

14\. What is a pipe?

A pipe passes the output of one command as input to another command.

15\. What is grep?

Grep searches text using patterns.

16\. What is the difference between absolute and relative paths?

An absolute path starts from `/`, while a relative path starts from the current directory.

17\. What is SSH?

SSH is a secure protocol used to remotely access and manage another machine.

18\. What is cron?

Cron is a scheduler used to execute commands automatically at specified times.

19\. How do you check running processes?

I use `ps aux`, `top` or `htop`.

20\. How do you check which process is using a port?

```
sudo ss -tulnp
```

21\. How do you monitor application logs?

```
tail -f application.log
```

22\. How do you check available RAM?

```
free -h
```

23\. How do you check disk space?

```
df -h
```

24\. How do you find a file?

```
find . -name "filename"
```

25\. How do you run a process in the background?

Add `&` at the end of the command.


# DAILY DEVELOPMENT — LINUX

## 2. Linux Daily Developer Workflow

```
# Navigate to project
cd ~/projects/myapp

# View files
ls -la

# Search for Java files
find . -name "*.java"

# Search application errors
grep -i "error" application.log

# Monitor logs
tail -f application.log

# Check Java process
ps aux | grep java

# Check port usage
sudo ss -tulnp

# Check memory
free -h

# Check disk
df -h

# Check Java version
java -version
```

## 3. Common Backend Developer Scenarios

| Scenario                | Command                          |
| ----------------------- | -------------------------------- |
| Check application logs  | `tail -f app.log`                |
| Search errors           | `grep -i ERROR app.log`          |
| Find Java process       | `pgrep -af java`                 |
| Stop application        | `kill PID`                       |
| Check port 8080         | `sudo ss -ltnp 'sport = :8080'`  |
| Check disk space        | `df -h`                          |
| Check RAM               | `free -h`                        |
| Check service           | `systemctl status nginx`         |
| Change file permissions | `chmod 755 script.sh`            |
| Connect to server       | `ssh user@server`                |
| Copy file to server     | `scp app.jar user@server:/path/` |

# CONFUSING DIFFERENCES — LINUX

## Linux

| Concepts                      | Difference                                          |
| ----------------------------- | --------------------------------------------------- |
| Linux vs Unix                 | Linux is Unix-like, Unix is an older OS family      |
| Kernel vs Shell               | Core OS component vs command interpreter            |
| Terminal vs Shell             | Interface vs command interpreter                    |
| Root directory vs Root user   | `/` vs administrator account                        |
| File vs Process               | Stored data vs running program                      |
| `>` vs `>>`                   | Overwrite vs append                                 |
| `find` vs `grep`              | Search files vs search text                         |
| `df` vs `du`                  | Filesystem usage vs directory usage                 |
| `chmod` vs `chown`            | Change permissions vs change ownership              |
| `kill` vs `kill -9`           | Default graceful termination request vs force kill  |
| `apt update` vs `apt upgrade` | Refresh package lists vs upgrade installed packages |
| `start` vs `enable`           | Start now vs start automatically at boot            |
| `stdout` vs `stderr`          | Normal output vs error output                       |
| `&` vs `nohup`                | Run in background vs survive terminal logout        |

# QUICK REVISION — LINUX

## Linux: Top 30 Commands

```
pwd
ls -la
cd
mkdir
touch
rm
cp
mv
cat
less
head
tail -f
grep
find
chmod
chown
sudo
whoami
ps aux
top
kill
df -h
du -sh
free -h
ip addr
ping
curl
ssh
scp
systemctl status
```
