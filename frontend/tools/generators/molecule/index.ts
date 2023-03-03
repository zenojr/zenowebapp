import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments, readProjectConfiguration } from '@nrwl/devkit';
import { classify, dasherize } from '@nrwl/workspace/src/utils/strings';
import { lowerCase, upperFirst } from 'lodash'
import { Schema } from './schema';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: Schema) {
  const { name } = schema;
  const fileName = dasherize(name);
  const className = classify(name);
  const titleName = upperFirst(lowerCase(name));

  const filesPath = './files';
  const baseLib = 'components-molecules';

  const libraryRoot = readProjectConfiguration(tree, baseLib).root;
  const moleculePath = `${libraryRoot}/src/lib/${fileName}`;

  const files = joinPathFragments(__dirname, filesPath);
  const parameters = {
    name,
    fileName,
    className,
    titleName,
  }

  generateFiles(tree, files, moleculePath, parameters)
}
