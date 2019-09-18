import { rollup } from '../../../config/rollup.config';

export default rollup({
  name: 'hoc',
  extraGlobals: {
    '@apollo/taro-components': 'apolloTaroComponents'
  }
});
