# Kubeflow (kfctl) GitHub Action for AI/ML CI/CD

<a href="https://github.com/swiftdiaries/kfctl-kind-action"><img alt="GitHub Actions status" src="https://github.com/swiftdiaries/kfctl-kind-action/workflows/Test+kfctl+typescript-action/badge.svg"></a>

---

### Using with Kubernetes in Docker (KinD)

Sample to use the GitHub Action for CI/CD in your Kubeflow projects
```
...
name: "Kubeflow CI/CD"
on:
  pull_request:
  push:
    branches:
      - master
      - 'releases/*'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: checkout the repo
      uses: actions/checkout@v1
    - name: create KinD cluster
      uses: engineerd/setup-kind@v0.1.0
      with:
          version: "v0.5.0"
    - uses: swiftdiaries/kfctl-kind-action@v1
      env:
        KUBECONFIG: "/home/runner/.kube/kind-config-kind"
      with: 
        milliseconds: 1000
...
```

## 