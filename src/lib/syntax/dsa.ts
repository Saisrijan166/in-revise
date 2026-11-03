import type { SyntaxSheet } from "./types";

export const dsa: SyntaxSheet = {
  tagline:
    "The coding-interview patterns as ready Java templates, plus which structure fits which job.",
  baseline: "Java",
  lang: "java",
  groups: [
    {
      title: "Which structure for which job",
      rows: [
        {
          syntax: "int[] / ArrayList<>",
          what: "Indexed access, ordered items",
          example: "list.get(i); a[i];   // O(1) random access",
        },
        {
          syntax: "HashMap<K,V>",
          what: "Count / look up by key",
          example: "map.merge(k, 1, Integer::sum);   // frequency",
        },
        {
          syntax: "HashSet<T>",
          what: "Seen-before / dedupe",
          example: "if (!seen.add(x)) { /* duplicate */ }",
        },
        {
          syntax: "ArrayDeque<T> (stack)",
          what: "LIFO: undo, matching, DFS",
          example: "st.push(x); st.pop(); st.peek();",
        },
        {
          syntax: "ArrayDeque<T> (queue)",
          what: "FIFO: BFS, sliding window",
          example: "q.offer(x); q.poll(); q.peek();",
        },
        {
          syntax: "PriorityQueue<T>",
          what: "Always pull smallest/largest (heap)",
          example: "pq.offer(x); pq.poll();   // min by default",
        },
        {
          syntax: "TreeMap / TreeSet",
          what: "Sorted keys, floor/ceiling, range",
          example: "tm.floorKey(x); tm.ceilingKey(x);",
        },
      ],
    },
    {
      title: "Searching",
      rows: [],
      combos: [
        {
          label: "Binary search (exact index)",
          code: `int lo = 0, hi = a.length - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;   // avoid overflow
    if (a[mid] == target) return mid;
    else if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`,
        },
        {
          label: "Lower bound (first index >= target)",
          code: `int lo = 0, hi = a.length;      // hi is exclusive
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
}
return lo;   // insertion point; a.length if none`,
        },
        {
          label: "Two pointers (sorted pair sum)",
          code: `int i = 0, j = a.length - 1;
while (i < j) {
    int sum = a[i] + a[j];
    if (sum == target) return new int[]{i, j};
    else if (sum < target) i++;
    else j--;
}
return new int[]{-1, -1};`,
        },
        {
          label: "Sliding window (longest without repeat)",
          code: `Map<Character,Integer> last = new HashMap<>();
int start = 0, best = 0;
for (int end = 0; end < s.length(); end++) {
    char c = s.charAt(end);
    if (last.containsKey(c)) start = Math.max(start, last.get(c) + 1);
    last.put(c, end);
    best = Math.max(best, end - start + 1);
}
return best;`,
        },
      ],
    },
    {
      title: "Graphs and trees",
      rows: [],
      combos: [
        {
          label: "BFS on a grid (shortest steps)",
          code: `int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
Queue<int[]> q = new ArrayDeque<>();
boolean[][] seen = new boolean[R][C];
q.offer(new int[]{sr, sc}); seen[sr][sc] = true;
int steps = 0;
while (!q.isEmpty()) {
    for (int sz = q.size(); sz > 0; sz--) {
        int[] cur = q.poll();
        for (int[] d : dirs) {
            int r = cur[0]+d[0], c = cur[1]+d[1];
            if (r<0||c<0||r>=R||c>=C||seen[r][c]||grid[r][c]==1) continue;
            seen[r][c] = true; q.offer(new int[]{r, c});
        }
    }
    steps++;
}`,
        },
        {
          label: "DFS (recursive, adjacency list)",
          code: `void dfs(int node, List<List<Integer>> adj, boolean[] seen) {
    seen[node] = true;
    for (int next : adj.get(node)) {
        if (!seen[next]) dfs(next, adj, seen);
    }
}`,
        },
        {
          label: "Dijkstra (shortest weighted path)",
          code: `int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0;
// {node, distance}, min-heap by distance
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);
pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int u = cur[0], d = cur[1];
    if (d > dist[u]) continue;
    for (int[] e : adj.get(u)) {      // e = {neighbour, weight}
        int nd = d + e[1];
        if (nd < dist[e[0]]) { dist[e[0]] = nd; pq.offer(new int[]{e[0], nd}); }
    }
}`,
        },
        {
          label: "Union-Find (find + union by rank)",
          code: `int[] parent, rank;
int find(int x) {
    while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;                          // path compression
}
void union(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return;
    if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
    parent[rb] = ra;
    if (rank[ra] == rank[rb]) rank[ra]++;
}`,
        },
      ],
    },
    {
      title: "Backtracking",
      rows: [],
      combos: [
        {
          label: "Subsets (include / exclude)",
          code: `void build(int i, int[] nums, List<Integer> cur, List<List<Integer>> out) {
    if (i == nums.length) { out.add(new ArrayList<>(cur)); return; }
    build(i + 1, nums, cur, out);        // exclude nums[i]
    cur.add(nums[i]);
    build(i + 1, nums, cur, out);        // include nums[i]
    cur.remove(cur.size() - 1);          // undo (backtrack)
}`,
        },
        {
          label: "Permutations (used[] marker)",
          code: `void permute(int[] nums, boolean[] used, List<Integer> cur, List<List<Integer>> out) {
    if (cur.size() == nums.length) { out.add(new ArrayList<>(cur)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true; cur.add(nums[i]);
        permute(nums, used, cur, out);
        used[i] = false; cur.remove(cur.size() - 1);   // backtrack
    }
}`,
        },
      ],
    },
    {
      title: "Dynamic programming",
      rows: [],
      combos: [
        {
          label: "1D DP (climbing stairs)",
          code: `int[] dp = new int[n + 1];
dp[0] = 1; dp[1] = 1;
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];   // ways to reach step i
}
return dp[n];`,
        },
        {
          label: "1D DP (house robber, pick/skip)",
          code: `int prev = 0, prev2 = 0;    // rolling: O(1) space
for (int x : nums) {
    int take = prev2 + x;    // rob this house + best 2 back
    int skip = prev;         // skip this house
    prev2 = prev;
    prev = Math.max(take, skip);
}
return prev;`,
        },
      ],
    },
  ],
};
