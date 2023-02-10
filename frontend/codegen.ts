import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.graphql'],
    generates: {
        './src/graphql/__generated__/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
            presetConfig: {
                gqlTagName: 'gql',
            },
            config: {
                fetcher: 'graphql-request',
                isReactHook: true,
            },
        },
    },

    ignoreNoDocuments: true,
};

export default config;
