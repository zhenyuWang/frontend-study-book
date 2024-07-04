# React Compiler
This page will give you an introduction to the new experimental React Compiler and how to try it out successfully.\
experimental [ɪkˌsperɪˈment(ə)l] 实验性的

**Under Construction**\
These docs are still a work in progress. More documentation is available in the React Compiler Working Group repo, and will be upstreamed into these docs when they are more stable.

**You will learn**\
- Getting started with the compiler
- Installing the compiler and eslint plugin
- Troubleshooting

**Note**\
React Compiler is a new experimental compiler that we’ve open sourced to get early feedback from the community. It still has rough edges and is not yet fully ready for production.\
rough edges [rʌf ˈedʒɪz] 未完善的地方

React Compiler requires React 19 RC. If you are unable to upgrade to React 19, you may try a userspace implementation of the cache function as described in the Working Group. However, please note that this is not recommended and you should upgrade to React 19 when possible.\
upgrade [ˌʌpˈɡreɪd] 升级\
userspace [ˈjuːzəspeɪs] 用户空间\
implementation [ˌɪmplɪmenˈteɪʃn] 实现

React Compiler is a new experimental compiler that we’ve open sourced to get early feedback from the community. It is a build-time only tool that automatically optimizes your React app. It works with plain JavaScript, and understands the Rules of React, so you don’t need to rewrite any code to use it.

The compiler also includes an eslint plugin that surfaces the analysis from the compiler right in your editor. The plugin runs independently of the compiler and can be used even if you aren’t using the compiler in your app.\
surface [ˈsɜːfɪs] 表面\
analysis [əˈnæləsɪs] 分析\
independently [ˌɪndɪˈpendəntli] 独立地

 We recommend all React developers to use this eslint plugin to help improve the quality of your codebase.
