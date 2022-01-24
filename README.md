==PRODUCTION_DEPLOY=====
Set secret jwt-secret JWT_KEY=something
kubectl rollout restart deployment users-depl
kubectl apply -f infra/k8s && kubectl apply -f infra/k8s-prod