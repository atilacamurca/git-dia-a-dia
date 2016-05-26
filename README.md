# Git Workflow

## Configure git

* set username `git config --global user.name "Your Name"`
* set email `git config --global user.email "you@example.com"`
* set default editor for commit
* install git-town, gitg, meld
* set default mergetool

## Happy Day

Init a project: Homepage do COMSOLiD

```
$ git init --bare homepage.git
$ git clone homepage.git/ homepage-a
```

Start working

```
$ cd homepage-a
$ touch index.html
$ # edit index.html
```

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>COMSOLiD</title>
    </head>
    <body>

    </body>
</html>
```

```
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	index.html

nothing added to commit but untracked files present (use "git add" to track)
```

Add and commit

```
$ git add index.html
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   index.html
```

```
$ git commit
[master (root-commit) 76d6fc3] initial commit.
 1 file changed, 10 insertions(+)
 create mode 100644 index.html
```

```
$ git status
On branch master
Your branch is based on 'origin/master', but the upstream is gone.
  (use "git branch --unset-upstream" to fixup)

nothing to commit, working directory clean
```

```
$ git remote -v
origin	/tmp/homepage.git/ (fetch)
origin	/tmp/homepage.git/ (push)
```

```
$ git push origin master
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 315 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To /tmp/homepage.git/
 * [new branch]      master -> master
```

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working directory clean
```

Usuário b

```
$ git clone homepage.git/ homepage-b
Cloning into 'homepage-b'...
done.
$ cd homepage-b/
$ ls
index.html
```

## Issues: resolvendo issues em branches

### Usuário b deve resolver a tarefa:

1 - Adicionar Bootstrap a página inicial.

```
$ git checkout -b issue-1
$ # go to work!
```

start a local server

```
$ python -m SimpleHTTPServer
```

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>COMSOLiD</title>
        <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="vendor/bootstrap/navbar-fixed-top.css" media="screen" charset="utf-8">
    </head>
    <body>
        <script src="vendor/jquery/jquery.min.js" charset="utf-8"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js" charset="utf-8"></script>
    </body>
</html>
```

```
$ gitg
```

errar a mensagem e mostrar uso do `--amend`.

```
$ git commit --amend
$ git reflog
9b0eaf8 HEAD@{0}: commit (amend): Bootstrap adicionado.
75429d4 HEAD@{1}: commit:Bootstrap acionado.
a3c58cd HEAD@{2}: checkout: moving from master to issue-1
a3c58cd HEAD@{3}: clone: from /home/atila/projects/homepage.git/
```

Usar Pull Request para fazer o merge.

* Revisão do código
* Safe merge
* Integração com Continuous Integration (CI)

```
$ git checkout master
$ git merge --no-ff --log issue-1
$ git push origin master
```

### Usuário a deve resolver a tarefa:

2 - Adicionar logos de softwares livres

copy img sources to assets

```
$ git checkout -b issue-2
$ # go to work!
$ # commit using gitg
$ git checkout master
$ git merge --no-ff --log issue-2
$ git push origin master
To /home/atila/projects/homepage.git/
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to '/home/atila/projects/homepage.git/'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

mais um motivo para usar PR!

```
$ git fetch --prune
$ git rebase origin/master
$ git push origin master
```
