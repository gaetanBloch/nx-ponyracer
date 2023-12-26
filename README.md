# AngularMonorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

```bash
npx create-nx-workspace@latest geode --preset=angular-monorepo
nx g @nx/angular:library ui --publishable --import-path=@geode/components
npx husky-init && npm install
npm install --save-dev @commitlint/config-conventional @commitlint/cli
npm install --save-dev prettier@latest prettier-plugin-packagejson  prettier-plugin-tailwindcss rimraf
npm install --save-dev prettier-eslint
npx git-precommit-checks
npm install -D @commitlint/cz-commitlint @commitlint/prompt-cli commitizen @commitlint/config-conventional
npm install commitizen -g
commitizen init cz-conventional-changelog --save-dev --save-exact
npm i -D validate-branch-name \
  && npx husky add .husky/pre-push "npx --no-install validate-branch-name"
nx g @nx/angular:setup-tailwind ui
nx g @nx/angular:setup-tailwind ponyracer
npm i -D @tailwindcss/typography


npm i -D @angular/cdk
npm i -D @spartan-ng/cli
npm i @spartan-ng/ui-core
npx nx g @spartan-ng/cli:ui-theme
npx nx g @spartan-ng/cli:ui button
npx nx g @spartan-ng/cli:ui label
npx nx g @spartan-ng/cli:ui input
npx nx g @spartan-ng/cli:ui

npm i ngx-valdemort

npm i flowbite
```

## Start the app

To start the development server run `nx serve ponyracer`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
