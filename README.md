npm run build
docker build -t iampetrovpavel/users .
docker push iampetrovpavel/users
kubectl rollout restart deployment users-depl
kubectl apply -f