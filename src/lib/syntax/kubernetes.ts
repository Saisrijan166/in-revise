import type { SyntaxSheet } from "./types";

export const kubernetes: SyntaxSheet = {
  tagline: "The kubectl commands and short manifests you use to run workloads on Kubernetes.",
  baseline: "Kubernetes 1.34",
  lang: "bash",
  groups: [
    {
      title: "kubectl basics",
      rows: [
        {
          syntax: "kubectl get <kind>",
          what: "List resources of a kind",
          example: "kubectl get pods",
        },
        {
          syntax: "kubectl describe <kind> name",
          what: "Detailed state and events",
          example: "kubectl describe pod web-abc",
        },
        {
          syntax: "kubectl apply -f file.yaml",
          what: "Create or update from a manifest",
          example: "kubectl apply -f deploy.yaml",
        },
        {
          syntax: "kubectl delete -f file.yaml",
          what: "Delete what a manifest defines",
          example: "kubectl delete -f deploy.yaml",
        },
        {
          syntax: "kubectl delete <kind> name",
          what: "Delete a named resource",
          example: "kubectl delete pod web-abc",
        },
        {
          syntax: "kubectl explain <kind>",
          what: "Field docs for a resource",
          example: "kubectl explain deployment.spec",
        },
      ],
    },
    {
      title: "Inspect and debug",
      rows: [
        {
          syntax: "kubectl get pods -o wide",
          what: "List with node and IP",
          example: "kubectl get pods -o wide",
        },
        {
          syntax: "kubectl get svc / deploy",
          what: "List services / deployments",
          example: "kubectl get deploy",
        },
        {
          syntax: "kubectl logs -f pod",
          what: "Follow a pod's logs",
          example: "kubectl logs -f web-abc",
        },
        {
          syntax: "kubectl logs pod -c container",
          what: "Logs of one container in a pod",
          example: "kubectl logs web-abc -c app",
        },
        {
          syntax: "kubectl exec -it pod -- sh",
          what: "Shell into a running pod",
          example: "kubectl exec -it web-abc -- sh",
        },
        {
          syntax: "kubectl port-forward pod h:c",
          what: "Forward a local port to a pod",
          example: "kubectl port-forward web-abc 8080:8080",
        },
        {
          syntax: "kubectl get events",
          what: "Cluster events (sorted)",
          example: "kubectl get events --sort-by=.lastTimestamp",
        },
        {
          syntax: "kubectl top pod",
          what: "CPU/memory use (needs metrics)",
          example: "kubectl top pod",
        },
      ],
    },
    {
      title: "Workloads",
      rows: [
        {
          syntax: "kubectl scale deploy name --replicas=N",
          what: "Change replica count",
          example: "kubectl scale deploy web --replicas=3",
        },
        {
          syntax: "kubectl set image deploy/name c=img",
          what: "Roll out a new image",
          example: "kubectl set image deploy/web app=myapp:2.0",
        },
        {
          syntax: "kubectl rollout status deploy/name",
          what: "Watch a rollout finish",
          example: "kubectl rollout status deploy/web",
        },
        {
          syntax: "kubectl rollout undo deploy/name",
          what: "Roll back to the previous version",
          example: "kubectl rollout undo deploy/web",
        },
        {
          syntax: "kubectl rollout restart deploy/name",
          what: "Restart all pods (re-pull config)",
          example: "kubectl rollout restart deploy/web",
        },
        {
          syntax: "kubectl rollout history deploy/name",
          what: "List rollout revisions",
          example: "kubectl rollout history deploy/web",
        },
      ],
    },
    {
      title: "Config: ConfigMap and Secret",
      rows: [
        {
          syntax: "kubectl create configmap name --from-literal=k=v",
          what: "ConfigMap from key/values",
          example: "kubectl create configmap app --from-literal=LOG=debug",
        },
        {
          syntax: "kubectl create configmap name --from-file=f",
          what: "ConfigMap from a file",
          example: "kubectl create configmap app --from-file=app.properties",
        },
        {
          syntax: "kubectl create secret generic name --from-literal=k=v",
          what: "Secret from key/values",
          example: "kubectl create secret generic db --from-literal=PASSWORD=s3cret",
        },
        {
          syntax: "kubectl get <kind> name -o yaml",
          what: "Dump a resource as YAML",
          example: "kubectl get configmap app -o yaml",
        },
        {
          syntax: "kubectl get secret name -o jsonpath",
          what: "Read one field (base64)",
          example: "kubectl get secret db -o jsonpath='{.data.PASSWORD}'",
        },
      ],
    },
    {
      title: "Namespaces and context",
      rows: [
        { syntax: "kubectl get ns", what: "List namespaces", example: "kubectl get ns" },
        {
          syntax: "kubectl create namespace name",
          what: "Create a namespace",
          example: "kubectl create namespace staging",
        },
        {
          syntax: "-n namespace",
          what: "Target a namespace",
          example: "kubectl get pods -n staging",
        },
        {
          syntax: "kubectl config get-contexts",
          what: "List cluster contexts",
          example: "kubectl config get-contexts",
        },
        {
          syntax: "kubectl config use-context name",
          what: "Switch cluster/context",
          example: "kubectl config use-context prod",
        },
        {
          syntax: "kubectl config set-context --current --namespace=ns",
          what: "Default namespace for context",
          example: "kubectl config set-context --current --namespace=staging",
        },
      ],
    },
    {
      title: "Manifests",
      rows: [
        {
          syntax: "apiVersion / kind / metadata / spec",
          what: "Every manifest's top fields",
          example: "kind: Deployment",
        },
        {
          syntax: "spec.selector / template",
          what: "Which pods a controller owns",
          example: "matchLabels: { app: web }",
        },
        {
          syntax: "spec.replicas",
          what: "Desired pod count (Deployment)",
          example: "replicas: 3",
        },
        {
          syntax: "spec.type: ClusterIP|NodePort|LoadBalancer",
          what: "How a Service is exposed",
          example: "type: LoadBalancer",
        },
      ],
      combos: [
        {
          label: "Deployment",
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: app
          image: myapp:1.0
          ports:
            - containerPort: 8080`,
        },
        {
          label: "Service (routes to the pods above)",
          code: `apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP`,
        },
        {
          label: "ConfigMap",
          code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: debug
  DB_URL: jdbc:postgresql://db:5432/app`,
        },
      ],
    },
  ],
};
