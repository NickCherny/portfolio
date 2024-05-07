import type { Schema, Attribute } from '@strapi/strapi';

export interface MetaDomain extends Schema.Component {
  collectionName: 'components_meta_domains';
  info: {
    displayName: 'domain';
    icon: 'briefcase';
  };
  attributes: {
    type: Attribute.Enumeration<['HEALTHCARE', 'E_COMERCE']>;
  };
}

export interface MetaImage extends Schema.Component {
  collectionName: 'components_meta_images';
  info: {
    displayName: 'image';
    icon: 'picture';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    alt: Attribute.String;
  };
}

export interface MetaLink extends Schema.Component {
  collectionName: 'components_meta_links';
  info: {
    displayName: 'link';
    icon: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    icon: Attribute.Media;
    alt: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface MetaStudySubject extends Schema.Component {
  collectionName: 'components_meta_study_subjects';
  info: {
    displayName: 'study_subject';
    icon: 'book';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    score: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      >;
    skill_type: Attribute.Enumeration<['HARD', 'SOFT']>;
    label: Attribute.String & Attribute.Required;
    houres: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 7;
        },
        number
      >;
  };
}

export interface MetaTechnology extends Schema.Component {
  collectionName: 'components_meta_technologies';
  info: {
    displayName: 'technology';
    icon: 'code';
    description: '';
  };
  attributes: {
    name: Attribute.Enumeration<
      [
        'JS',
        'TS',
        'CSS',
        'SASS',
        'HTML',
        'HTML5',
        'NODE_JS',
        'WEBPACK',
        'FLUX',
        'REDUX_JS',
        'GULP_JS',
        'NORMALIZR',
        'RESELECT',
        'REDUX_SAGA',
        'RX_JS',
        'REDUX_OBSERVABLE',
        'REACT_NATIVE',
        'IOS',
        'ANDROID',
        'POST_CSS',
        'CCS3',
        'AWS',
        'AWS_S3',
        'AWS_SNS',
        'AWS_SQS',
        'AWS_SERVERLESS',
        'FIREBASE',
        'FIREBASE_PUSH_NOTIFICATIONS',
        'FIREBASE_AUTH',
        'FIREBASE_STORAGE',
        'NEXT_JS',
        'APOLLO_JS_CLIENT',
        'APOLLO_JS_SERVER',
        'GRAPHQL',
        'EXPRESS_JS',
        'KOA_JS',
        'NEST_JS',
        'STRAPI',
        'REACT',
        'GATSBY',
        'REACT ROUTER',
        'STYLED COMPONENTS',
        'MATERIAL-UI',
        'CHAKRA UI',
        'FRAMER MOTION',
        'SWR',
        'APOLLO CLIENT',
        'BABEL',
        'ESLINT',
        'PRETTIER'
      ]
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'meta.domain': MetaDomain;
      'meta.image': MetaImage;
      'meta.link': MetaLink;
      'meta.study-subject': MetaStudySubject;
      'meta.technology': MetaTechnology;
    }
  }
}
