/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { runBazel } from '@kbn/bazel-runner';
import { ICommand } from '.';
import { log } from '../utils/log';

export const BuildCommand: ICommand = {
  description: 'Runs a build in the Bazel built packages',
  name: 'build',

  reportTiming: {
    group: 'scripts/kbn build',
    id: 'total',
  },

  async run(projects, projectGraph, { options }) {
    // Call bazel with the target to build all available packages
    await runBazel({
      bazelArgs: ['build', '//packages:build', '--show_result=1'],
      log,
      offline: options?.offline === true,
    });
  },
};
