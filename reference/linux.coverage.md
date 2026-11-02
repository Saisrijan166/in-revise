# Coverage: Linux
Reference: reference/linux.md  ·  Last updated: 02-11-2026

Every numbered section and every "vs" pair / interview question in `reference/linux.md`
appears once below (Mapped, Corrected or Dropped). Additions beyond the reference are listed too.

## Mapped
| Reference item | Landed in | Note |
|---|---|---|
| 1. Linux Fundamentals (terminology, architecture) | concepts `what-is-linux`, `linux-architecture`, `kernel-and-userspace`, `shell-and-terminal`, `running-commands`; glossary | Linux vs Unix as an Interview Q + trap in `what-is-linux` |
| 2. File System Structure (dirs, paths, symbols) | concepts `filesystem-hierarchy`, `paths-absolute-relative`; comparison `absolute-vs-relative-path` | symbols `. .. ~ -` as tree nodes |
| 3. Basic Navigation Commands | concept `navigation` | pwd, ls -l/-a, cd |
| 4. File & Directory Operations | concept `file-operations` | touch, mkdir -p, cp, mv, rm -rf, rmdir |
| 5. Reading & Editing Files | concepts `viewing-files`, `editing-files` | cat/less/head/tail -f/wc; nano/vim |
| 6. Linux Permissions | concepts `file-permissions`, `chmod`, `ownership`; comparison `chmod-vs-chown` | numeric + symbolic |
| 7. Linux Users & Groups | concepts `users-and-groups`, `sudo-and-root`; comparison `su-vs-sudo` | /etc/passwd, shadow, group, sudoers |
| 8. Searching Files & Text | concepts `grep`, `find`; comparison `find-vs-grep` | locate/which/whereis as points/glossary |
| 9. Pipes & Redirection | concept `pipes-and-redirection`; comparison `redirect-vs-pipe` | stdin/out/err, 2>&1 |
| 10. Process Management | concepts `processes`, `monitoring-processes`, `signals`; comparison `sigterm-vs-sigkill` | ps/top/kill/pgrep |
| 11. Package Management | concept `package-management`; comparison `apt-update-vs-upgrade` | apt + dnf/yum |
| 12. Networking Commands | concepts `networking-basics`, `network-commands`, `http-tools`, `ports-and-sockets`, `dns-tools`, `ssh-and-scp` | ports table, ss -tulnp |
| 13. Environment Variables | concept `env-variables` | PATH, export, ~/.bashrc |
| 14. Services & System Monitoring | concepts `systemd-services`, `journald-logs`, `system-monitoring`; comparisons `start-vs-enable`, `df-vs-du` | systemctl, journalctl, free/df/du/uptime |
| 15. Archives & Compression | concept `archives-compression` | tar/gzip/zip |
| 16. Scheduling & Background Jobs | concepts `cron-scheduling`, `jobs-and-background`; comparison `background-vs-nohup` | cron format, nohup, & |
| 17. Important Shortcuts | points inside `running-commands` and `jobs-and-background` | Ctrl+C/Z/D/L/R, !!, Tab |
| 18. Important Interview Questions (Q1-Q25) | spread across the matching concepts' Interview Qs | df vs du, kill vs kill -9, 755 vs 644, pipe, SSH, cron |
| Daily Linux workflow + backend scenarios | story spine; the relevant concepts | |
| Confusing differences — Linux (14 pairs) | the 12 comparison files + inline traps | Linux-vs-Unix, terminal-vs-shell, root-dir-vs-root-user, stdout-vs-stderr, `>`-vs-`>>` handled inline |
| Quick revision — Linux top 30 | covered across the concepts and the cheat sheet | |

## Corrected (reference was wrong, outdated or unclear)
| Reference item | What was wrong | Fixed to | Source |
|---|---|---|---|
| §10 signals: Ctrl+Z implied to be SIGSTOP (19) | Ctrl+Z actually sends SIGTSTP (20), a catchable terminal-stop; SIGSTOP (19) is the uncatchable one | Cards state Ctrl+Z = SIGTSTP (catchable) vs SIGSTOP (not) | https://man7.org/linux/man-pages/man7/signal.7.html |
| §13 env: "set NAME=value" to create a variable | `set` sets shell options / positional parameters, not named variables | A plain assignment `NAME=value` (shell variable) vs `export NAME=value` (environment variable) | https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html |
| (further corrections appended after the verification pass) | | | |

## Added beyond the reference (important topics it missed)
| New item | Landed in | Why it was added |
|---|---|---|
| Kernel space vs user space, system calls | concept `kernel-and-userspace` | A core "how does Linux work" interview topic the reference skips |
| Hard vs symbolic links, inode | concept `links-hard-symbolic` | Very commonly asked; the reference omits links entirely |
| Wildcards / globbing | concept `wildcards-globbing` | The shell expands `*`/`?`; asked and easy to get wrong |
| setuid / setgid / sticky bit | concept `special-permissions` | Standard follow-up to chmod (why `/tmp` and `passwd` are special) |
| Zombie and orphan processes | concept `zombie-and-orphan` | Classic process-management interview question |
| sort/uniq/cut/sed/awk | concept `text-processing` | The everyday text-pipeline tools beyond grep |
| Shell scripting basics | concept `shell-scripting` | shebang, variables, $1, if/for — expected of backend devs |
| SSH keys, /etc/hosts, traceroute | concepts `ssh-and-scp`, `dns-tools`, `network-commands` | Rounds out the networking the reference lists |

## Dropped
| Reference item | Reason |
|---|---|
| ASCII permission/architecture boxes | Reference formatting; redrawn as tables/Mermaid |
| Exhaustive port list beyond the common ones | Kept the common ports (22/80/443/3306/5432/6379/8080); the rest are glossary/able to look up |
| `yum` deep detail | Mentioned as the RPM-based equivalent; apt is the baseline |
