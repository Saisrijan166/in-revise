# Basics and the Shell

## What Linux Is ⭐

Linux is an open-source operating system **kernel** — the core that manages CPU, memory, processes, devices and hardware. A **distribution** (Ubuntu, Fedora, Debian) is a full OS built around that kernel.

The system is layered: your apps sit on top, the shell and system libraries below them, the kernel below that, and the hardware at the bottom.

- Kernel: core that controls hardware and resources.
- Userspace: everything above the kernel (shells, tools, your apps).

> Remember: Linux is the kernel; a distro is the whole OS built around it.

## Shell, Terminal and Commands

- **Shell**: a program that reads and runs commands (Bash is the common one).
- **Terminal**: the window where you type into a shell.
- **CLI / GUI**: command-line vs graphical interface.

```bash
whoami     # current user
uname -a   # kernel and system info
pwd        # current directory
```

> Remember: the terminal is the window; the shell is the program that runs the commands inside it.

## Pipes and Redirection ⭐

Every command has three streams: **stdin** (input, FD 0), **stdout** (output, FD 1) and **stderr** (errors, FD 2). A **pipe** sends one command's output into another; **redirection** sends a stream to or from a file.

| Operator | Meaning |
| --- | --- |
| `>` | redirect output, overwrite file |
| `>>` | append output to file |
| `<` | read input from file |
| `2>` | redirect errors (stderr) |
| `2>&1` | send stderr to wherever stdout goes |
| `\|` | pipe output into the next command |

```bash
echo "Hello" > file.txt        # overwrite
echo "World" >> file.txt       # append
command > out.log 2>&1         # output and errors to one file
ps aux | grep java             # list processes, keep only java lines
```

> Remember: `>` overwrites, `>>` appends, `|` connects commands; `2>` is errors only.

## Environment Variables

Named values that processes can read, such as `PATH` (where the shell looks for commands), `HOME`, `USER` and `PWD`. `export` passes a variable to child processes.

```bash
echo $HOME            # read a variable
export NAME="Srijan"  # set and export to child processes
unset NAME            # remove it
```

- `$` reads a variable's value.
- Variables set in a shell are not permanent; persist them in `~/.bashrc` or `~/.profile`.

> Remember: `export` makes a variable visible to child processes; config files make it survive new shells.

# Filesystem and Navigation

## The Directory Hierarchy ⭐

Linux has one tree starting at `/` (root). Important branches:

| Directory | Purpose |
| --- | --- |
| `/` | top of the filesystem |
| `/home` | user home directories |
| `/root` | root user's home |
| `/etc` | system configuration files |
| `/var`, `/var/log` | changing data and logs |
| `/tmp` | temporary files |
| `/usr` | applications, libraries, utilities |
| `/bin`, `/sbin` | essential and admin commands |
| `/opt` | optional third-party apps |
| `/dev`, `/proc`, `/sys` | device files and virtual kernel/process info |
| `/mnt`, `/media` | mount points for disks and removable media |

> Remember: config lives in `/etc`, logs in `/var/log`, devices and kernel state in `/dev`, `/proc`, `/sys`.

## Paths and Symbols

- **Absolute path**: starts from `/` (`/home/srijan/Documents`).
- **Relative path**: starts from where you are (`Documents`).
- Linux paths are **case-sensitive**.

| Symbol | Meaning |
| --- | --- |
| `~` | current user's home |
| `.` / `..` | current / parent directory |
| `-` | previous directory (with `cd -`) |
| `*` / `?` | match any characters / one character |

> Remember: absolute starts at `/`; relative starts at your current directory.

## Moving Around

```bash
pwd          # where am I
ls -la       # long listing including hidden files
cd Documents # enter a directory
cd ..        # up one level
cd ~         # home
cd -         # back to previous directory
```

- Hidden files start with `.`; `ls -a` shows them.
- `ls -l` shows permissions, owner, group, size and modified time.

> Remember: `ls -la` is the everyday listing; `cd -` toggles back to where you just were.

# Working with Files

## Create, Copy, Move, Delete

| Command | Purpose |
| --- | --- |
| `touch f` | create empty file / update timestamp |
| `mkdir d`, `mkdir -p a/b/c` | make directory / nested directories |
| `rmdir d` | remove an **empty** directory |
| `rm f`, `rm -r d`, `rm -rf d` | delete file / directory / force-delete |
| `cp a b`, `cp -r a b` | copy file / directory |
| `mv old new` | move or rename |

```bash
mkdir project && cd project
touch Main.java
cp Main.java Backup.java
mv Backup.java OldMain.java   # rename
rm OldMain.java
```

- `mv` does both move and rename.
- `rm -rf` never asks for confirmation — dangerous.

> Remember: `rmdir` only clears empty folders; `rm -r` clears full ones; `rm -rf` is irreversible.

## Reading Files

| Command | Purpose |
| --- | --- |
| `cat f` | print the whole file |
| `less f` / `more f` | scroll page by page |
| `head -n 5 f` / `tail -n 20 f` | first / last N lines |
| `tail -f f` | follow a file as it grows |
| `wc f` | count lines, words, bytes |

```bash
tail -f /var/log/syslog   # watch logs live
```

> Remember: `tail -f` is the standard way to watch application logs in real time.

## Links

- **Hard link**: a second name pointing to the same file data on disk; the data stays until every hard link is gone.
- **Symbolic (soft) link**: a small file that points to another path; it breaks if the target is removed.

> Remember: a hard link is another name for the same data; a symlink is a pointer to a path.

# Permissions and Users

## Reading Permissions ⭐⭐

A listing like `-rwxr-xr--` has four parts: file type, then **owner**, **group** and **others**, each with read (`r`), write (`w`), execute (`x`).

| Permission | Value |
| --- | --- |
| r | 4 |
| w | 2 |
| x | 1 |

Add the values per role: `7 = rwx`, `6 = rw-`, `5 = r-x`, `4 = r--`, `0 = ---`.

- On a **directory**, `x` means you can enter/traverse it; `w` means you can create, delete and rename entries inside.

> Remember: three roles (owner, group, others), three bits each; add 4+2+1 to get the number.

## chmod and chown ⭐

```bash
chmod 755 script.sh   # owner rwx, group r-x, others r-x
chmod 644 file.txt    # owner rw-, others r--
chmod 600 secret.txt  # owner rw- only
chmod u+x script.sh   # add execute for the owner
chmod a+x script.sh   # add execute for all
sudo chown srijan:developers -R project/   # change owner and group
```

- Symbolic targets: `u` owner, `g` group, `o` others, `a` all; `+`/`-` add/remove.
- Common numbers: `755` executables, `644` normal files, `600` private files.

> Remember: `chmod` changes **permissions**, `chown` changes **ownership**.

## Users and Groups

- **User**: an account; **root** is the admin, usually UID 0.
- **Group**: a set of users sharing permissions. **UID**/**GID** are their numeric IDs.

```bash
id                 # your user and group IDs
cat /etc/passwd    # user accounts
cat /etc/group     # groups
su username        # switch to another user
sudo adduser srijan
passwd             # change password
```

Key files: `/etc/passwd` (accounts), `/etc/shadow` (password hashes, restricted), `/etc/group` (groups), `/etc/sudoers` (sudo rules).

> Remember: `/etc/passwd` lists users; secrets live in the restricted `/etc/shadow`.

## sudo and su

- `sudo command`: run a single command with elevated privileges (your own password).
- `su user`: switch into another user's account for a whole session.
- `sudo` is **not** the same as logging in as root.

> Remember: `sudo` elevates one command; `su` becomes another user.

# Search and Text

## find ⭐

Searches the filesystem by name, type, size and more.

```bash
find . -name "Main.java"     # by exact name
find . -name "*.java"        # by pattern
find . -type d               # directories only
find . -type f -size +100M   # files larger than 100 MB
```

> Remember: `find` locates **files** by their attributes, not by their contents.

## grep ⭐

Searches **inside** files for text patterns.

| Flag | Meaning |
| --- | --- |
| `-i` | ignore case |
| `-r` | search recursively |
| `-n` | show line numbers |
| `-v` | show non-matching lines |

```bash
grep -i "error" app.log       # case-insensitive match
grep -rn "TODO" .             # recursive, with line numbers
```

> Remember: `grep` searches text inside files; combine with pipes to filter any output.

## Related text tools

- `sort` orders lines; `uniq` collapses adjacent duplicates (often `sort | uniq`).
- `which` / `whereis` locate an executable; `locate` searches a prebuilt file database.

> Remember: `sort` then `uniq` to count or dedupe lines of text.

# Processes and Jobs

## Viewing Processes ⭐

A **process** is a running program with a **PID** (and **PPID**, its parent). A **daemon** is a background service; a **zombie** is a finished process whose exit status the parent has not yet collected.

```bash
ps aux | grep java   # detailed process list, filtered
pgrep java           # just the PIDs
top                  # live monitoring (htop if installed)
```

> Remember: `ps aux` for a snapshot, `top` for a live view, `pgrep` for just the IDs.

## Signals and kill ⭐⭐

`kill` sends a **signal** to a process; it does not always mean "terminate".

| Signal | Number | Meaning |
| --- | --- | --- |
| SIGINT | 2 | interrupt (Ctrl+C) |
| SIGKILL | 9 | force kill |
| SIGTERM | 15 | ask to stop gracefully |
| SIGHUP | 1 | hangup |
| SIGSTOP | 19 | stop/pause |

```bash
kill 1234      # sends SIGTERM (15) — graceful
kill -9 1234   # sends SIGKILL (9) — forced
pkill java     # by name
```

- Default `kill` is SIGTERM, letting the process clean up.
- SIGKILL **cannot be caught or ignored**; try `kill` before `kill -9`.

> Remember: SIGTERM asks nicely, SIGKILL cannot be refused — reach for `-9` last.

## Foreground and Background Jobs

- `&` runs a command in the background.
- `Ctrl+C` interrupts; `Ctrl+Z` suspends the foreground job.
- `jobs` lists shell jobs; `bg` resumes one in background; `fg` brings one to the foreground.
- `nohup` keeps a command running after you log out.

```bash
java Main.java &                          # background
nohup java -jar app.jar > app.log 2>&1 &  # survives logout, logs to file
```

> Remember: `&` backgrounds for this session; `nohup` keeps it alive after the terminal closes.

# Packages, Services and System

## Package Management

A **package manager** installs, updates and removes software from **repositories**, resolving **dependencies**. APT is used on Ubuntu/Debian; DNF/RPM on Fedora.

```bash
sudo apt update     # refresh available package lists
sudo apt upgrade    # install available updates
sudo apt install nginx
sudo apt remove nginx    # remove, keep config
sudo apt purge nginx     # remove, delete config too
sudo apt autoremove      # drop unused dependencies
```

Other distros: `sudo dnf install nginx` (Fedora), `sudo yum install nginx` (older RPM systems).

> Remember: `apt update` refreshes the list; `apt upgrade` actually installs updates.

## systemd Services

**systemd** is the common service manager; `systemctl` controls services and `journalctl` reads their logs.

```bash
systemctl status nginx
sudo systemctl start nginx     # run now
sudo systemctl enable nginx    # auto-start at boot
sudo systemctl restart nginx
journalctl -u nginx -n 50      # last 50 log lines for the service
```

- `start`/`stop`/`restart` act now; `enable`/`disable` control boot behaviour; `reload` re-reads config without a full restart.

> Remember: `start` runs it now, `enable` makes it start at every boot.

## System Monitoring

```bash
free -h          # memory
df -h            # filesystem disk usage
du -sh folder/   # space used by one folder
uptime           # uptime and load average (1/5/15 min)
lsblk            # block devices
```

> Remember: `df` is whole-disk usage, `du` is one folder's usage.

## Archives and Compression

```bash
tar -cvf backup.tar folder/      # create archive
tar -xvf backup.tar              # extract
tar -czvf backup.tar.gz folder/  # create gzip-compressed
tar -xzvf backup.tar.gz          # extract gzip
zip -r backup.zip folder/ && unzip backup.zip
```

tar options: `c` create, `x` extract, `v` verbose, `f` file, `z` gzip, `t` list.

> Remember: `tar` bundles files; add `z` to gzip-compress the bundle.

## Scheduling with cron

**cron** runs commands on a schedule; a **crontab** holds the jobs. Format: `minute hour day-of-month month day-of-week command`.

```bash
crontab -e                        # edit jobs
crontab -l                        # list jobs
0 9 * * * /home/srijan/backup.sh  # every day at 9 AM
```

> Remember: five time fields — minute, hour, day-of-month, month, day-of-week — then the command.

# Networking

## Core Concepts

- **IP address**: identifies a network interface; **port**: identifies a service on it.
- **DNS**: turns domain names into IPs. **localhost** (`127.0.0.1`) is your own machine.
- **Socket**: an address + port endpoint for TCP/UDP.
- Ports below 1024 are privileged; `ping` uses ICMP, which a server may block even while HTTP works.

> Remember: an IP finds the machine, a port finds the service on it.

## Everyday Commands ⭐

```bash
ip addr                # local IP addresses
ping google.com        # reachability test
curl https://example.com   # make an HTTP request
sudo ss -tulnp         # listening sockets and their processes
nslookup google.com    # DNS lookup (dig for detail)
ssh user@server-ip     # remote login
scp app.jar user@server-ip:/home/user/   # copy over SSH
```

Common ports: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL, 6379 Redis, 8080 alt HTTP.

> Remember: `ss -tulnp` shows what is listening and which process owns the port.

# Common "Why X vs Y?" Comparisons

## Core Pairs ⭐⭐

| Pair | Difference |
| --- | --- |
| Kernel vs Shell | core OS that runs hardware vs program that runs your commands |
| Terminal vs Shell | the window vs the command interpreter inside it |
| Root directory vs Root user | `/` (top of the tree) vs the admin account |
| `chmod` vs `chown` | change permissions vs change ownership |
| `su` vs `sudo` | become another user for a session vs run one command elevated |
| Hard link vs Symbolic link | another name for the same data vs a pointer to a path |
| `find` vs `grep` | locate files by attributes vs search text inside files |
| `>` vs `>>` | overwrite a file vs append to it |
| stdout vs stderr | normal output (FD 1) vs error output (FD 2) |

> Remember: shell/terminal, chmod/chown and find/grep are the pairs interviewers lean on.

## Process and System Pairs ⭐

| Pair | Difference |
| --- | --- |
| SIGTERM vs SIGKILL (`kill` vs `kill -9`) | graceful stop the process can handle vs forced kill it cannot refuse |
| `&` vs `nohup` | background it for this session vs keep it alive after logout |
| `df` vs `du` | whole-filesystem usage vs one folder's usage |
| `apt update` vs `apt upgrade` | refresh package lists vs install the updates |
| `start` vs `enable` | run the service now vs start it at every boot |
| Linux vs Unix | open-source, Unix-like kernel/ecosystem vs the older OS family it descends from |

> Remember: prefer SIGTERM first; `&` dies with the shell, `nohup` lives on.
