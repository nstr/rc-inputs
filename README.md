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
  value={"some value"}
  onChange={(element) => console.log("value", element.target.value)}
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)} 
  onEnter={(value) => console.log(value)} 
  autofill={true}
  autoComplete={"email"}     
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the input.
`placeholder` | string | Default placeholder of the input.
`value` | string | Value of the input.
`onChange` | function | The function returns the same as onChange of an average input.
`onValid` | function | The first argument returns bool (true if the email is valid). The second argument returns the same as onChange of an average input.
`onEnter` | function | Handling enter button
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input.

## PasswordInput

```jsx
import { PasswordInput } from "rc-inputs";

<PasswordInput 
  className={"some-class"}
  placeholder={"Password must be at least 6 characters"}
  value={"qwerty123"}
  onChange={(element) => console.log("value", element.target.value)}
  pattern={"^.{6,}$"}
  onValid={(valid, element) => console.log("valid", valid, "value", element.target.value)}
  onEnter={(value) => console.log(value)} 
  autofill={true}
  autoComplete={"password"}     
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the input.
`placeholder` | string | Default placeholder of the input.
`value` | string | Value of the input.
`onChange` | function | The function returns the same as onChange of an average input.
`pattern` | string | You can use RegExp for handle input value. 
`onValid` | function | The first argument of the function returns bool (true if the password is valid according to your pattern). The second argument returns the same as onChange of an average input. Without `pattern` property `onValid` doesn't work.
`onEnter` | function | Handling enter button
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input. 


## TagInput

```jsx
import { TagInput } from "rc-inputs";
import "rc-inputs/styles/tag-input.css" // or tag-input.less or tag-input.scss

<TagInput 
  tags={[{name: "some name", href: "https://www.some...", className: "some-tag-class", style: {color: "#fff"}}]}
  onAdd={(tag) => console.log(tag)}
  onDelete={(tagIndex, tag, tags) => console.log(tagIndex, tag, tags)}
  onChange={(tags) => console.log(tags)}
  disableInput={false}
/>
```

Property | Type | Description
:---|:---|:---
`tags` | array of string, or array of objects | In the case of using Objects, the tag requires a name and in this case possible use to className and style. Example of the tag like an Object `{name: "tag name", className: "some-class", style: {color: "#fff"}}`.
`onAdd` | function | The function returns new tag created by a user.
`onDelete` | function | The first argument of the function returns tag's index of deleted tag in the tags array. The second argument returns deleted tag. The third argument returns the tags.
`onChange` | function | The function returns the array of current tags.
`disableInput` | bool | You can hide input. In this case `TagInput` will be just for reading.

Also exist posobility include some elements into TagInput. In this way, the elements will be added after all elements of TagInput. Usage example: Add EmailInput Component with handling valid emails.

```jsx
class SomeComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      isValid: false,
      inputValue: ""
    };
    this.addTag = this.addTag.bind(this);
    this.handleValidity = this.handleValidity.bind(this);
  }
  addTag(value) {
    if (this.state.isValid) {
      const emails = this.state.emails.concat([value]);
      this.setState({
        emails: emails,
        inputValue: ""
      });
    }
  }
  handleValidity(isValid, e) {
    this.setState({
      isValid: isValid,
      inputValue: e.target.value
    });
  }
  render() {
    return (
      <TagInput disableInput={true}
        tags={this.state.emails}>
        <EmailInput value={this.state.inputValue} 
          onEnter={this.addTag}
          onValid={this.handleValidity} />
       </TagInput>
      );
   }
}
```


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
  listPlaceholder={"the list is empty"}
  onChange={(e) => console.log("e", e)}
  selected={{option: "item 2"}}
  customeArrow={<i className="my-arrow" />}
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the Select.
`options` | array of string, or array of objects | In the case of using Objects, the tag requires a field `option` and in this case possible use to className and style. It is possible to to put the component in the field `option`. Example of the `option` like an Object `{option: <i className="some-class" />}` or `{option: "item 1", className: "some-class", style: {backgroundColor: "red"}}`.
`listPlaceholder` | string or Object | This item will be shown if the list will be empty.
`onChange` | function | The function returns selected option.
