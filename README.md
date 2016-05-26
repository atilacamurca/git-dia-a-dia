# Git: Dia-a-dia

## Configure git

* set username `git config --global user.name "Your Name"`
* set email `git config --global user.email "you@example.com"`
* set default editor for commit `git config --global core.editor "vim"`
* install git-town, gitg, meld
* set default mergetool `git config --global merge.tool meld`

## Happy Day

Init a project: Homepage do COMSOLiD

```
$ git init --bare homepage.git
$ git clone homepage.git/ homepage-a
```

Alice starts working...

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

Usuário Bob

```
$ git clone homepage.git/ homepage-b
Cloning into 'homepage-b'...
done.
$ cd homepage-b/
$ ls
index.html
```

## Issues: resolvendo issues em branches

### Bob: 1 - Adicionar Bootstrap a página inicial.

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

### Alice: 2 - Adicionar logos de softwares livres

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

## Git town

__Development Workflow__

* [git hack](/documentation/commands/git-hack.md) - cuts a new up-to-date feature branch off the main branch
* [git sync](/documentation/commands/git-sync.md) - updates the current branch with all ongoing changes
* [git new-pull-request](/documentation/commands/git-new-pull-request.md) - create a new pull request
* [git ship](/documentation/commands/git-ship.md) - delivers a completed feature branch and removes it

### Bob: 3 - Criar seção Distros Linux

```
$ git checkout master
$ git sync
$ git hack issue-3
```

show every step of hack.

__obs__: fazer o hack de Alice antes de commitar!

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
        <div class="container">
            <section>
                <h1>Distribuições GNU/Linux</h1><hr>
                <div class="row">
                    <div class="col-md-2">
                        <img src="img/distributor-logo-archlinux.png" alt="archlinux" />
                    </div>
                    <div class="col-md-4">
                        <h3>Arch Linux</h3>
                        <a href="https://www.archlinux.org/" class="btn btn-link">Site Oficial</a>
                        <p>
                            Arch Linux is a Linux distribution for computers based on IA-32 and x86-64 architectures. It is composed predominantly of free and open-source software, and supports community involvement.
                        </p>
                    </div>
                    <div class="col-md-2">
                        <img src="img/distributor-logo-debian.png" alt="debian" />
                    </div>
                    <div class="col-md-4">
                        <h3>Debian</h3>
                        <a href="http://www.debian.org/" class="btn btn-link">Site Oficial</a>
                        <p>
                            Debian is a Unix-like computer operating system that is composed entirely of free software, most of which is under the GNU General Public License, and packaged by a group of individuals known as the Debian Project. Three mai…
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <img src="img/distributor-logo-eos.png" alt="elementary" />
                    </div>
                    <div class="col-md-4">
                        <h3>Elementary OS</h3>
                        <a href="http://elementaryos.org/" class="btn btn-link">Site Oficial</a>
                        <p>
                            elementary OS is a Linux distribution based on Ubuntu. It makes use of a desktop with its own shell named Pantheon, and is deeply integrated with other elementary OS applications like Plank, Midori and Scratch. This dist…
                        </p>
                    </div>
                    <div class="col-md-2">
                        <img src="img/distributor-logo-gentoo.png" alt="gentoo" />
                    </div>
                    <div class="col-md-4">
                        <h3>Gentoo</h3>
                        <a href="https://www.gentoo.org/" class="btn btn-link">Site Oficial</a>
                        <p>
                            Gentoo Linux is a computer operating system based on the Linux kernel and built using the Portage package management system. It is distributed as free and open-source software. Unlike a binary software distribution, …
                        </p>
                    </div>
                </div>
            </section>
        </div>
        <script src="vendor/jquery/jquery.min.js" charset="utf-8"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js" charset="utf-8"></script>
    </body>
</html>
```

```
$ gitg
Seção de Distribuições GNU/Linux

Fixed #3.
$ git new-pull-request
```

Para o exemplo usar `ship`.

### Alice: 4 - Criar seção Ambientes gráficos

```
$ git checkout master
$ git hack issue-4
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
        <div class="container">
            <section>
                <h1>Ambientes Gráficos Livres</h1><hr>
                <div class="row">
                    <div class="col-md-4">
                        <h3>GNOME</h3>
                        <p>
                            GNOME is a desktop environment that is composed entirely of free and open-source software. GNOME was originally an acronym for GNU Network Object Model Environment. Its target operating system is Linux, but it is also…
                        </p>
                    </div>
                    <div class="col-md-2">
                        <img src="img/desktop-environment-gnome.png" alt="png" class="center-block"/><hr>
                        <a href="https://www.gnome.org/" class="btn btn-default btn-block">Site Oficial</a>
                    </div>
                    <div class="col-md-4">
                        <h3>KDE</h3>
                        <p>
                            KDE is an international free software community producing free and libre software like Plasma Desktop, KDE Frameworks and many cross-platform applications designed to run on modern Unix-like and Microsoft Window…
                        </p>
                    </div>
                    <div class="col-md-2">
                        <img src="img/desktop-environment-kde.png" alt="png" class="center-block"/><hr>
                        <a href="http://www.kde.org/" class="btn btn-default btn-block">Site Oficial</a>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4">
                        <h3>XFCE</h3>
                        <p>
                            Xfce is a free and open-source desktop environment for Unix and Unix-like platforms, such as Linux, Solaris, and BSD.
                        </p>
                    </div>
                    <div class="col-md-2">
                        <img src="img/desktop-environment-xfce.png" alt="png" class="center-block"/><hr>
                        <a href="http://xfce.org/" class="btn btn-default btn-block">Site Oficial</a>
                    </div>
            </div>
        </section>
    </div>
    <script src="vendor/jquery/jquery.min.js" charset="utf-8"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js" charset="utf-8"></script>
</body>
</html>
```

```
$ # add and commit
Seção Ambientes gráficos.

Fixed #4.
$ git ship
...
Mesclagem automática de index.html
CONFLITO (conteúdo): conflito de mesclagem em index.html
Automatic merge failed; fix conflicts and then commit the result.

To abort, run "git ship --abort".
To continue after you have resolved the conflicts, run "git ship --continue".
$ git ship --abort
```

undo the commit

```
$ git log
$ # obter hash do seu commit! algo como 6485209
$ git reset --hard HEAD^
$ git sync
$ git merge 6485209
Mesclagem automática de index.html
CONFLITO (conteúdo): conflito de mesclagem em index.html
Automatic merge failed; fix conflicts and then commit the result.
$ git mergetool
Merging:
index.html

Normal merge conflict for 'index.html':
  {local}: modified file
  {remote}: modified file
```

Fazer o merge das alterações do remoto com as suas locais.

__obs:__ caso esqueça qual o último commit usar comando `git reflog`.

```
$ git commit
[issue-4 188bf6c] Merge commit '6485209' into issue-4
```

Merge commit, sempre é feito após uma resolução de conflitos.

```
$ git ship
```

`git ship` fez `merge --squash`, mas também poderia ser feito com
`git rebase -i master`.

__TODO__ mostrar uso do rebase.
