/**
 * @flow
 *
 * Helpers for navigation.
 */

import type {
  NavigationProp,
  NavigationParams,
  NavigationScreenProp,
  NavigationNavigateAction,
} from './TypeDefinition';

import NavigationActions from './NavigationActions';
import invariant from './utils/invariant';

export default function<S: *>(navigation: NavigationProp<S, NavigationAction>) {
    // 添加点击判断
    let debounce = true;
    return {
        ...navigation,
        goBack: (key?: ?string): boolean =>
            navigation.dispatch(
                NavigationActions.back({
                    key: key === undefined ? navigation.state.key : key,
                }),
            ),
        navigate: (routeName: string,
                   params?: NavigationParams,
                   action?: NavigationAction,): boolean => {
            if (debounce) {
                debounce = false;
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName,
                        params,
                        action,
                    }),
                );
                setTimeout(
                    () => {
                        debounce = true;
                    },
                    500,
                );
                return true;
            }
            return false;
        },
        /**
         * For updating current route params. For example the nav bar title and
         * buttons are based on the route params.
         * This means `setParams` can be used to update nav bar for example.
         */
        setParams: (params: NavigationParams): boolean =>
            navigation.dispatch(
                NavigationActions.setParams({
                    params,
                    key: navigation.state.key,
                }),
            ),
    };
}
