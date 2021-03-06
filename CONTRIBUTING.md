# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Project setup](#project-setup)
- [Add yourself as a contributor](#add-yourself-as-a-contributor)
- [Committing and Pushing changes](#committing-and-pushing-changes)
  - [Tests](#tests)
  - [opt into git hooks](#opt-into-git-hooks)
- [Help needed](#help-needed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project setup

1.  Fork and clone the repo
2.  `npm run setup` to setup and validate your clone of the project
3.  Create a branch for your PR

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/sastan/react-render-callback.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification. To
add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```console
npm run add-contributor
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If
you've already added yourself to the list and are making a new type of
contribution, you can run it again and select the added contribution type.

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes. You can run
`npm run test:update` which will update any snapshots that need updating. Make
sure to include those changes (if they exist) in your commit. We also track the
bundle sizes in a `.size-snapshot.json` file, this will likely update when you
make changes to the codebase.

### Tests

There are quite a few test scripts that run as part of a `validate` script in
this project:

- lint - ESLint stuff, pretty basic. Please fix any errors/warnings :)
- build-and-test - This ensures that the built version of `react-render-callback` is what we expect. These tests live in `other/misc-tests/__tests__`.
- test:cover - This is primarily unit tests on the source code and accounts for most of the coverage. We enforce 100% code coverage on this library.

### opt into git hooks

There are git hooks set up with this project that are automatically installed
when you install dependencies. They're really handy, but are turned off by
default (so as to not hinder new contributors). You can opt into these by
creating a file called `.opt-in` at the root of the project and putting this
inside:

```
pre-commit
```

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[all-contributors]: https://github.com/kentcdodds/all-contributors
[issues]: https://github.com/sastan/react-render-callback/issues