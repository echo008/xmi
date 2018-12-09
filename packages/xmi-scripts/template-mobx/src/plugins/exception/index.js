import recompact from 'recompact'

import withLoading from './with-loading'
import withException from './with-exception'

const enhance = recompact.compose(
    withLoading,
    withException
)

export default enhance
