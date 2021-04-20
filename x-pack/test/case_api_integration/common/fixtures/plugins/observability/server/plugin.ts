/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Plugin, CoreSetup } from 'kibana/server';

import { PluginSetupContract as FeaturesPluginSetup } from '../../../../../../../plugins/features/server';
import { SpacesPluginStart } from '../../../../../../../plugins/spaces/server';
import { SecurityPluginStart } from '../../../../../../../plugins/security/server';

export interface FixtureSetupDeps {
  features: FeaturesPluginSetup;
}

export interface FixtureStartDeps {
  security?: SecurityPluginStart;
  spaces?: SpacesPluginStart;
}

/**
 * These are a copy of the values here: x-pack/plugins/cases/common/constants.ts because when the plugin attempts to
 * import them from the constants.ts file it gets an error.
 */
const casesSavedObjectTypes = [
  'cases',
  'cases-connector-mappings',
  'cases-sub-case',
  'cases-user-actions',
  'cases-comments',
  'cases-configure',
];

export class FixturePlugin implements Plugin<void, void, FixtureSetupDeps, FixtureStartDeps> {
  public setup(core: CoreSetup<FixtureStartDeps>, deps: FixtureSetupDeps) {
    const { features } = deps;
    features.registerKibanaFeature({
      id: 'observabilityFixture',
      name: 'ObservabilityFixture',
      app: ['kibana'],
      category: { id: 'cases-fixtures', label: 'Cases Fixtures' },
      cases: ['observabilityFixture'],
      privileges: {
        all: {
          app: ['kibana'],
          cases: {
            all: ['observabilityFixture'],
          },
          savedObject: {
            all: ['alert', ...casesSavedObjectTypes],
            read: [],
          },
          ui: [],
        },
        read: {
          app: ['kibana'],
          cases: {
            read: ['observabilityFixture'],
          },
          savedObject: {
            all: [],
            read: [...casesSavedObjectTypes],
          },
          ui: [],
        },
      },
    });
  }
  public start() {}
  public stop() {}
}
