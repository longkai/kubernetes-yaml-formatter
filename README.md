# Better YAML Formatter for Visual Studio Code

A [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=kennylong.kubernetes-yaml-formatter) that provides format support for [YAML](https://yaml.org) language.

Frustrated of the builtin formatter with its own [option philosophy](https://prettier.io/docs/en/option-philosophy.html)?

Or you guys comes from devops world where dealing with a lot of yaml everyday like kubernetes, ansible or helm template.

And you have your own prefer style of YAML, e.g., **do not indent sequence elements** or other customization settings.

This extension is made for you :)

## Features

Format **correct**, **consistent** and **customized** yaml text with **Better YAML Formatter**.

https://github.com/user-attachments/assets/dfdec44b-221f-436d-9d90-413f0c0effe6

Take the k8s yaml for example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

As you see, the sequence style(`containers` and `ports`) in the k8s style yaml has no indent. Each time you play with [kubectl](https://kubernetes.io/docs/reference/kubectl/), there is no indent. Not to mention some tool like [kustomize](https://github.com/kubernetes-sigs/kustomize) [requires you do that](https://github.com/kubernetes-sigs/kustomize/issues/3946).

Unluckily, the builtin yaml format has its own [option philosophy](https://prettier.io/docs/en/option-philosophy.html). It always does indent and [resists to accept](https://github.com/prettier/prettier/issues/12385) such a customization setting.

It's useless. I have to keep the style manually every time editing yaml files, or you will end up with a non-idiomatic one.

It's tedious. So I create this extension to make life easier.

## Extension Settings

This extension contributes the following settings:

* `better-yaml.directives`: Whether block sequences should be indented.
* `better-yaml.directives`: Include directives in the output. If true, at least the document-start marker --- is always included. If false, no directives or marker is ever included. If null, directives and marker may be included if required.
* `better-yaml.commentString`: Change the comment prefix string. By default, empty comment lines are left empty, lines consisting of a single space are replaced by `#`, and all other lines are prefixed with a `#`.

## Thanks

Thanks [lupengpeng](https://github.com/iamlupeng1991) for the icon design. It's great!

Many thanks the following projects:

* [eemeli/yaml](https://github.com/eemeli/yaml)

Without them there wouldn't be this extension.

Throughout the process I learnt a lot and also made some contributions back to them.

Definitely welcome your patches and contributions!
