# Keeping Components Pure
Some JavaScript functions are pure. Pure functions only perform a calculation and nothing more. By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. To get these benefits, though, there are a few rules you must follow.\
pure [pjʊr] 纯的、
baffling [ˈbæflɪŋ] 令人困惑的
unpredictable [ˌʌnprɪˈdɪktəbl] 不可预测的\
purity [ˈpjʊərəti] 纯度

You will learn
- What purity is and how it helps you avoid bugs
- How to keep components pure by keeping changes out of the render phase
- How to use Strict Mode to find mistakes in your components
