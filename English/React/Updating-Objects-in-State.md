# Updating Objects in State
State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.

You will learn
- How to correctly update an object in React state
- How to update a nested object without mutating it
- What immutability is, and how not to break it
- How to make object copying less repetitive with Immer

mutate [mjuːˈteɪt] v. 变异；使变异；使突变；使变化\
immutability [ˌɪmjuːtəˈbɪləti] n. 不变性；恒定性\
repetitive [rɪˈpetətɪv] adj. 重复的；反复的；重复性的\
immer [ɪmər] n. 沉浸；专心；陷入；沉浸式
