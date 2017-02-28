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
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)} 
  onChange={(element) => console.log("value", element.target.value)}
  defaultValue={"some value"}
  autofill={true}
  className={"some-class"}
  placeholder={"Please enter a valid email address."}
  autoComplete={"email"}     
/>
```

## PasswordInput

```jsx
import { PasswordInput } from "rc-inputs";

<PasswordInput 
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)} 
  onChange={(element) => console.log("value", element.target.value)}
  defaultValue={"some value"}
  autofill={true}
  className={"some-class"}
  pattern={"^.{6,}$"}
  placeholder={"Password must be at least 6 characters"}
  autoComplete={"password"}     
/>
```

## TagInput

```jsx
import { TagInput } from "rc-inputs";
import "rc-inputs/styles/tag-input.css" // or tag-input.less or tag-input.scss

<TagInput 
  tags={[{name: "some name", href: "https://www.some...", className: "some-tag-class"}]}
  addTag={(tag) => console.log(tag)}
  onDelete={(tagIndex, tag, tags) => console.log(tagIndex, tag, tags)}
  disableInput={false}
/>
```

## Select

```jsx
import { Select } from "rc-inputs";
import "rc-inputs/styles/select.css" // or select.less or select.scss

<Select
  className="some class"
  customeArrow={<i className="my-arrow">}
  placeholder={"placeholder"}
  onChange={(e) => console.log("e", e)}
  selected={{option: "item 2"}}
  options={[
    {option: "item 1", className: "test-1", style: {backgroundColor: "red"}},
    {option: "item 2", className: "test-2", style: {backgroundColor: "green"}},
    {option: "item 3", className: "test-3", style: {backgroundColor: "yellow"}},
    {option: "item 4", className: "test-4", style: {backgroundColor: "blue"}}
]}/>
```
