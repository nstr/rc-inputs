# rc-inputs

* [Installation](#installation)
* [EmailInput](#emailinput)
* [PasswordInput](#passwordinput)
* [TagInput](#taginput)
* [Select](#select)

## Installation

```
npm i rc-inputs --save
```

## EmailInput

```jsx
import { EmailInput } from "rc-inputs";

<EmailInput 
  className={"some-class"}
  placeholder={"Please enter a valid email address."}
  defaultValue={"some value"}
  onChange={(element) => console.log("value", element.target.value)}
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)} 
  autofill={true}
  autoComplete={"email"}     
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the input.
`placeholder` | string | Default placeholder of the input.
`defaultValue` | string | You can preset default value of the input.
`onChange` | function | The function returns the same as onChange of an average input.
`onValid` | function | The first argument returns bool (true if the email is valid). The second argument returns the same as onChange of an average input.
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input.

## PasswordInput

```jsx
import { PasswordInput } from "rc-inputs";

<PasswordInput 
  className={"some-class"}
  placeholder={"Password must be at least 6 characters"}
  defaultValue={"qwerty123"}
  onChange={(element) => console.log("value", element.target.value)}
  pattern={"^.{6,}$"}
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)} 
  autofill={true}
  autoComplete={"password"}     
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the input.
`placeholder` | string | Default placeholder of the input.
`defaultValue` | string | You can preset default value of the input.
`onChange` | function | The function returns the same as onChange of an average input.
`pattern` | string | You can use RegExp for handle input value. 
`onValid` | function | The first argument of the function returns bool (true if the password is valid according to your pattern). The second argument returns the same as onChange of an average input. Without `pattern` property `onValid` doesn't work.
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input. 


## TagInput

```jsx
import { TagInput } from "rc-inputs";
import "rc-inputs/styles/tag-input.css" // or tag-input.less or tag-input.scss

<TagInput 
  tags={[{name: "some name", href: "https://www.some...", className: "some-tag-class"}]}
  onChange={(tag) => console.log(tag)}
  onDelete={(tagIndex, tag, tags) => console.log(tagIndex, tag, tags)}
  disableInput={false}
/>
```

Property | Type | Description
:---|:---|:---
`tags` | array of string, or array of objects | In the case of using Objects, the tag requires a name and in this case possible use to className. Example of the tag like an Object `{name: "tag name", className: "some-class"}`.
`onChange` | function | The function returns new tag created by a user.
`onDelete` | function | The first argument of the function returns tag's index of deleted tag in the tags array. The second argument returns deleted tag. The third argument returns the tags.
`disableInput` | bool | You can hide input. In this case `TagsInput` will be just for reading.

## Select

```jsx
import { Select } from "rc-inputs";
import "rc-inputs/styles/select.css" // or select.less or select.scss

<Select
  className="some-class"
  options={[
    {option: "item 1", className: "test-1", style: {backgroundColor: "red"}},
    {option: "item 2", className: "test-2", style: {backgroundColor: "green"}},
    {option: "item 3", className: "test-3", style: {backgroundColor: "yellow"}},
    {option: "item 4", className: "test-4", style: {backgroundColor: "blue"}}
  ]}
  placeholder={"placeholder"}
  onChange={(e) => console.log("e", e)}
  selected={{option: "item 2"}}
  customeArrow={<i className="my-arrow" />}
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the Select.
`options` | array of string, or array of objects | In the case of using Objects, the tag requires a field `option` and in this case possible use to className and style. It is possible to to put the component in the field `option`. Example of the `option` like an Object `{option: <i className="some-class" />}` or `{option: "item 1", className: "some-class", style: {backgroundColor: "red"}}`.
`onChange` | function | The function returns selected option.
