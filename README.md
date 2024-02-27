# Kubernetes YAML Formatter X for Visual Studio Code

A [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=kiliantyler.kubernetes-yaml-formatter-x) that provides format support for [YAML](https://yaml.org) language.

You find the right format extension if you come from DevOps world, e.g., [Kubernetes](https://kubernetes.io/docs/concepts/), [Ansible Playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) or CI workflow like [Github Actions](https://docs.github.com/en/actions) and so on.

**Based on [Longkai's Original Extension](https://github.com/longkai/kubernetes-yaml-formatter) except updated**

## Features

![Format YAML](images/showcase.gif)

As a Kubernetes developer, aka YAML engineer, you deal with a lot of yaml files everyday. Take the k8s yaml for example:

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
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

As you see, the sequence style(`containers` and `ports`) in the k8s style yaml has no indent. Each time you play with [kubectl](https://kubernetes.io/docs/reference/kubectl/), there is no indent. Not to mention some tool like [kustomize](https://github.com/kubernetes-sigs/kustomize) [requires you do that](https://github.com/kubernetes-sigs/kustomize/issues/3946).

Unluckily, the builtin yaml format has its own [option philosophy](https://prettier.io/docs/en/option-philosophy.html). It always does indent and [resists to accept](https://github.com/prettier/prettier/issues/12385) such a customization setting.

It's useless. I have to keep the style manually every time editing yaml files, or you will end up with a non-idiomatic one.

It's tedious. So I create this extension to make life easier. Now you can control which way you prefer and everyone is happy.

**Enjoy!**

## Extension Settings

This extension contributes the following settings:

* `kubernetes-yaml-formatter-x.formatType`: The type of formatting to use. 'basic' is the default, there is only basic currently. (default: `basic`)
* `kubernetes-yaml-formatter-x.retainLineBreaks`: Retain line breaks in formatted yaml (default: `false`)
* `kubernetes-yaml-formatter-x.retainLineBreaksSingle`: (NOTE: Takes precedence over retain_line_breaks) Retain line breaks in formatted yaml, but only keep a single line in groups of many blank lines. (default: `false`)
* `kubernetes-yaml-formatter-x.scanFoldedAsLiteral`: Option that will preserve newlines in folded block scalars (blocks that start with >) (default: `false`)
* `kubernetes-yaml-formatter-x.indentlessArrays`: Render - array items (block sequence items) without an increased indent. (default: `false`)
* `kubernetes-yaml-formatter-x.disallowAnchors`: If true, reject any YAML anchors or aliases found in the document. (default: `false`)
* `kubernetes-yaml-formatter-x.maxLineLength`: Set the maximum line length. If not set, defaults to 0 which means no limit. (default: `0`)
* `kubernetes-yaml-formatter-x.dropMergeTags`: Assume that any well formed merge using just a << token will be a merge, and drop the !!merge tag from the formatted result. (default: `false`)
* `kubernetes-yaml-formatter-x.padLineComments`: The number of padding spaces to insert before line comments. (default: `1`)
* `kubernetes-yaml-formatter-x.includeDocumentStart`: Include the document start marker (---) at the beginning of the document. (default: `false`)

It makes format yaml on save default to `true`, you can disable it:

```json
"[yaml]": {
  "editor.formatOnSave": false
}
```

## Thanks

Thanks [lupengpeng](https://github.com/iamlupeng1991) for the icon design.
Thanks to [Longkai's Original Extension](https://github.com/longkai/kubernetes-yaml-formatter)

Thanks the following projects:

* [google/yamlfmt](https://github.com/google/yamlfmt)