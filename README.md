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
`onPaste` | function | Handler of paste event.
`onEnter` | function | Handling enter button.
`onFocus` | function | The function called after focus event.
`onBlur` | function | The function called after blur (unfocus) event.
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input.
`clickableKeys` | array of int | This is keyCodes of keyboard events
`onKeyClick` | function | Onclicks handler of `clickableKeys`

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
`onEnter` | function | Handling enter button.
`onPaste` | function | Handler of paste event.
`onFocus` | function | The function called after focus event.
`onBlur` | function | The function called after blur (unfocus) event.
`autofill` | bool | Turn off, turn on autofill. You can fetch "remembers" of a browser.
`autoComplete` | string | Default autoComplete of the input.
`clickableKeys` | array of int | This is keyCodes of keyboard events
`onKeyClick` | function | Onclicks handler of `clickableKeys`


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
`dropdownClassName` | string | CSS classes for dropdown list of the Select.
`activeClass` | string | CSS class for the active option
`options` | array of string, or array of objects | In the case of using Objects, the tag requires a field `option` and in this case possible use to className and style. It is possible to to put the component in the field `option`. Example of the `option` like an Object `{option: <i className="some-class" />}` or `{option: "item 1", className: "some-class", style: {backgroundColor: "red"}}`.
`listPlaceholder` | string or Object | This item will be shown if the list will be empty.
`onChange` | function | The function returns selected option and index of this option.
`activeIndex` | Int | If you are using jsx like a option `{option: <i className="some-class" />}`, you have to use `activeIndex`. Example bellow.

```jsx
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      option: <span>test 1</span>
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(option, index) {
    this.setState({
      activeIndex: index,
      option: option
    });
  }
  render() {
    return (
     <Select
       onChange={this.handleSelect}
       activeClass={"active"}
       activeIndex={this.state.activeIndex}
       selected={this.state.option}
       options={[
        {option: <span>item 1</span>, className: "some-class"},
        {option: <span>item 2</span>, className: "some-class"},
        {option: <span>item 3</span>, className: "some-class"},
        {option: <span>item 4</span>, className: "some-class"}
      ]}/>
    );
  }
}
```

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
  createTagOnKeys={[13, 32]}
  createTagOnPress={[","]}
/>
```

Property | Type | Description
:---|:---|:---
`className` | string | CSS classes of the tag list element.
`classNameWrap` | string | CSS classes of the element wrapper.
`tags` | array of string, or array of objects | In the case of using Objects, the tag requires a name and in this case possible use to className and style. Example of the tag like an Object `{name: "tag name", className: "some-class", style: {color: "#fff"}}`.
`onAdd` | function | The function returns new tag created by a user.
`onDelete` | function | The first argument of the function  returns deleted tag. The second argument returns tag's index of deleted tag in the tags array. The third argument returns the tags.
`onChange` | function | The function returns the array of current tags.
`onInputChange` | function | Handler of own input typing.
`onPaste` | function | Handler of paste event.
`onFocus` | function | The function called after focus event.
`onBlur` | function | The function called after blur (unfocus) event.
`createTagOnKeys` | array (int) | Array of keyCodes. When you press this character on the keyboard, a tag will be created and functions `onAdd` and `onChange` will be called
`createTagOnPress` | array | Array of characters. When you press this character on the keyboard, a tag will be created and functions `onAdd` and `onChange` will be called
`disableInput` | bool | You can hide input. In this case `TagInput` will be just for reading.
`dynamicInputWidth` | bool | The prop makes any inner input(custom or default) stretched on all remaining width. The default is false.
`autocomplete` | object | Special data for autocomplete. See schema below.
`inputValue` | string | Value setter. Use only with `autocomplete` and included input. This prop required if you want to use `autocomplete`.
`onSelect` | function | The function returns selected tag from `autocomplete` and all used `tags`

Autocomplete Schema

Property | Type | Description
:---|:---|:---
`items` | array | Displayed items of autocomplete
`searchKey` | string | If you are using objects in `items` you will have to select key of an object on which will be searched.
`searchPath` | string | Completely the same as `searchKey` but works for the deep key. Use dots for going deeper. For exemple key for object `{test: {abc: 123}}` will be `test.abc`. Attention! It doesn't work with `searchKey`.
`label` | string | text in the begin of the autocomplete list.

Also exist posobility include some elements into TagInput. In this way, the elements will be added after all elements of TagInput. If you are using autocomplete, don't forget `inputValue`. Usage example: Add EmailInput Component with handling valid emails.

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
        inputValue={this.state.inputValue}
        autocomplete={{
          items: [{userData: {email: "test@test.co"}, name: "jo"},
          {userData: {email: "tom@gmail.com"}, name: "tom"},
          {userData: {email: "mark@mark.net"}, name: "mark"},
          {userData: {email: "al@amazon.com"}, name: "alice"},
          {userData: {email: "al@al.co"}, name: "alex"}],
          searchPath: "userData.email",
          className: "list",
          label: "this is label:"
        }}
        tags={this.state.emails}>
        <EmailInput value={this.state.inputValue}
          onEnter={this.addTag}
          onValid={this.handleValidity} />
       </TagInput>
      );
   }
}
```
