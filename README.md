# <a href="https://www.apollographql.com/"><img src="https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png" height="100" alt="React Apollo"></a>

## hooks common 测试可用，别的还没试过～

setApolloContext

```js

import { getApolloContext, setApolloContext } from '@apollo/taro-hooks'

let context = getApolloContext()
 
setApolloContext(Object.assign({}, context, { client }))



