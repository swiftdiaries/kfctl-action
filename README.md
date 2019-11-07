# Kubeflow (kfctl) GitHub Action for AI/ML CI/CD

[![Actions Status](https://github.com/swiftdiaries/kfctl-kind-action/workflows/Build/badge.svg)](https://github.com/swiftdiaries/kfctl-kind-action/actions)

---

## This Action installs Kubeflow on a Kubernetes cluster

What is this used for?

- Automatic testing of [Kubeflow](www.kubeflow.org) applications.

### Usage
---------

#### Example Workflow with Kubernetes in Docker (KinD)

This Action is used in the third step.
```
...
name: "Kubeflow CI/CD via Actions"
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

    #######################################
    ### This is the Action that copies code
    ### from the current repo
    - name: Step 1 - Checkout the repo
      uses: actions/checkout@v1
    
    ###################################
    ### This is the Action that creates
    ### a Kubernetes in Docker cluster
    - name: Step 2 - create a KinD cluster
      uses: engineerd/setup-kind@v0.1.0
      with:
          version: "v0.5.0"
    
    ####################################
    ### This is the Action that installs
    ### Kubeflow on the KinD cluster
    - name: Step 3 - 
      uses: swiftdiaries/kfctl-kind-action@v1
      env:
        KUBECONFIG: "/home/runner/.kube/kind-config-kind"
      with: 
        milliseconds: 1000
...
```
