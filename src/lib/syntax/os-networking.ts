import type { SyntaxSheet } from "./types";

export const osNetworking: SyntaxSheet = {
  tagline: "The diagnostic commands, ports, protocols and OS facts you reach for all the time.",
  baseline: "Linux · TCP/IP",
  lang: "bash",
  groups: [
    {
      title: "Network diagnostic tools",
      rows: [
        { syntax: "ping host", what: "Reachability + round-trip time", example: "ping google.com" },
        {
          syntax: "traceroute host",
          what: "Hops along the path",
          example: "traceroute google.com",
        },
        { syntax: "dig name", what: "DNS lookup (detailed)", example: "dig +short example.com" },
        { syntax: "nslookup name", what: "DNS lookup (simple)", example: "nslookup example.com" },
        {
          syntax: "curl -I url",
          what: "Show response headers only",
          example: "curl -I https://example.com",
        },
        { syntax: "ss -tulnp", what: "Listening TCP/UDP ports + PIDs", example: "ss -tulnp" },
        {
          syntax: "ip addr / ip route",
          what: "Interfaces / routing table",
          example: "ip addr show",
        },
        { syntax: "nc -zv host port", what: "Test if a port is open", example: "nc -zv db 5432" },
        {
          syntax: "tcpdump -i any port 80",
          what: "Capture packets",
          example: "tcpdump -i eth0 port 443",
        },
      ],
    },
    {
      title: "Common ports",
      rows: [
        { syntax: "22", what: "SSH", example: "ssh user@host" },
        { syntax: "53", what: "DNS", example: "name resolution" },
        { syntax: "80 / 443", what: "HTTP / HTTPS", example: "web traffic" },
        { syntax: "3306 / 5432", what: "MySQL / PostgreSQL", example: "database" },
        { syntax: "6379", what: "Redis", example: "cache" },
        { syntax: "9092", what: "Kafka broker", example: "streaming" },
        { syntax: "27017", what: "MongoDB", example: "document DB" },
        { syntax: "25 / 587", what: "SMTP / submission", example: "email" },
      ],
    },
    {
      title: "TCP vs UDP",
      rows: [
        { syntax: "TCP", what: "Reliable, ordered, connection", example: "HTTP, SSH, databases" },
        {
          syntax: "UDP",
          what: "Fast, no guarantee, no handshake",
          example: "DNS, video, games, QUIC",
        },
        { syntax: "Handshake", what: "TCP connection setup", example: "SYN -> SYN-ACK -> ACK" },
        { syntax: "ESTABLISHED", what: "Connection is open", example: "seen in ss / netstat" },
        {
          syntax: "TIME_WAIT",
          what: "Closing side waits before reuse",
          example: "normal after close",
        },
        { syntax: "CLOSE_WAIT", what: "App hasn't closed its socket", example: "many = a leak" },
      ],
    },
    {
      title: "HTTP and TLS",
      rows: [
        {
          syntax: "HTTP/1.1",
          what: "One request per connection (keep-alive)",
          example: "text, simple",
        },
        {
          syntax: "HTTP/2",
          what: "Multiplexed streams, binary",
          example: "many requests, one connection",
        },
        {
          syntax: "HTTP/3",
          what: "Runs over QUIC (UDP)",
          example: "faster setup, no head-of-line block",
        },
        {
          syntax: "TLS 1.3",
          what: "Encryption + 1-RTT handshake",
          example: "the s in https (RFC 8446)",
        },
        {
          syntax: "Status ranges",
          what: "2xx ok, 4xx client, 5xx server",
          example: "200, 404, 500",
        },
      ],
    },
    {
      title: "DNS and addressing",
      rows: [
        { syntax: "A / AAAA", what: "Name to IPv4 / IPv6", example: "example.com -> 93.184.x.x" },
        { syntax: "CNAME", what: "Alias to another name", example: "www -> example.com" },
        { syntax: "MX", what: "Mail servers", example: "email routing" },
        { syntax: "TXT", what: "Arbitrary text (SPF, verification)", example: "domain checks" },
        { syntax: "NS", what: "Authoritative name servers", example: "who answers for the zone" },
        { syntax: "127.0.0.1 / ::1", what: "Localhost (loopback)", example: "this machine" },
        {
          syntax: "Private ranges",
          what: "Not routable on the internet",
          example: "10.0.0.0/8, 172.16/12, 192.168/16",
        },
        { syntax: "/24 subnet", what: "256 addresses (254 usable)", example: "192.168.1.0/24" },
      ],
    },
    {
      title: "OS: processes and signals",
      rows: [
        { syntax: "fork()", what: "Create a child process", example: "returns 0 in child" },
        { syntax: "exec()", what: "Replace the process image", example: "run a new program" },
        {
          syntax: "wait() / waitpid()",
          what: "Reap a child, get exit status",
          example: "avoids zombies",
        },
        { syntax: "SIGINT (2)", what: "Interrupt from keyboard", example: "Ctrl+C" },
        { syntax: "SIGTERM (15)", what: "Polite stop (default kill)", example: "kill <pid>" },
        { syntax: "SIGKILL (9)", what: "Force stop, uncatchable", example: "kill -9 <pid>" },
        { syntax: "SIGHUP (1)", what: "Terminal closed / reload", example: "nohup ignores it" },
        {
          syntax: "SIGSTOP (19) / SIGCONT (18)",
          what: "Pause / resume, uncatchable stop",
          example: "job control",
        },
      ],
    },
    {
      title: "OS: memory and I/O",
      rows: [
        {
          syntax: "Virtual memory",
          what: "Per-process address space",
          example: "MMU + page tables -> RAM",
        },
        { syntax: "Page fault", what: "Page not in RAM", example: "fetched from disk/swap" },
        {
          syntax: "Stack vs heap",
          what: "Calls/locals vs dynamic objects",
          example: "stack grows down",
        },
        {
          syntax: "System call",
          what: "User -> kernel boundary",
          example: "read, write, open, mmap",
        },
        {
          syntax: "File descriptor",
          what: "Integer handle for a resource",
          example: "0 stdin, 1 stdout, 2 stderr",
        },
        {
          syntax: "Context switch",
          what: "CPU swaps between threads",
          example: "has real overhead",
        },
      ],
    },
  ],
};
