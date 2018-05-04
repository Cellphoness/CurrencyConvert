/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

//新建一个bundle文件夹 打包命令 react-native bundle --entry-file ./index.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
//node.js 服务器地址见ip.txt 如果改成localhost就走本地 端口默认5000
//ip.txt
//RCTBundleURLProvider.m kRCTBundleURLProviderDefaultPort(端口)
//刷新URL设置后的通知 RCTBundleURLProviderUpdatedNotification
//RCTMultipartDataTask.m (- (void)startTask)

//如果想做增量更新bundle 或者按照版本更新 可以用codePush 或者 pushy http://update.reactnative.cn/home & react-native-pushy https://github.com/reactnativecn/react-native-pushy/blob/master/README.md
//当然也还是可以自己造一个
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [[NSUserDefaults standardUserDefaults] setObject:@"immense-meadow-71083.herokuapp.com" forKey:@"RCT_jsLocation"];
//  [[RCTBundleURLProvider sharedSettings] setJsLocation:@"immense-meadow-71083.herokuapp.com"]; //动态修改的
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"currency/index.ios" fallbackResource:nil];
//  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"CurrencyConvert"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
