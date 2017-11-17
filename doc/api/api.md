# w-signal@1.1.2

Signal converter for w

+ Functions
  + [create(args)](#w-signal-function-create)
+ [`WSignal`](#w-signal-classes) Class
  + [new WSignal()](#w-signal-classes-w-signal-constructor)
  + [signal.load(Class, names)](#w-signal-classes-w-signal-load)
  + [signal.use(names)](#w-signal-classes-w-signal-use)
  + [signal.connect(signal)](#w-signal-classes-w-signal-connect)
  + [signal.disconnect(id)](#w-signal-classes-w-signal-disconnect)
  + [signal.send(config)](#w-signal-classes-w-signal-send)
  + [signal.ask(subject, options)](#w-signal-classes-w-signal-ask)
  + [signal.load(Class, names)](#w-signal-classes-w-signal-load)
  + [signal.use(names)](#w-signal-classes-w-signal-use)
  + [signal.connect(signal)](#w-signal-classes-w-signal-connect)
  + [signal.disconnect(id)](#w-signal-classes-w-signal-disconnect)
  + [signal.send(config)](#w-signal-classes-w-signal-send)
  + [signal.ask(subject, options)](#w-signal-classes-w-signal-ask)

## Functions

<a class='md-heading-link' name="w-signal-function-create" ></a>

### create(args) -> `WSignal`

Create a WSignal instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="w-signal-classes"></a>

## `WSignal` Class






<a class='md-heading-link' name="w-signal-classes-w-signal-constructor" ></a>

### new WSignal()

Constructor of WSignal class



<a class='md-heading-link' name="w-signal-classes-w-signal-load" ></a>

### signal.load(Class, names) -> `object`

Load subject into the signal

| Param | Type | Description |
| ----- | --- | -------- |
| Class |  |  |
| names | string | Name paths |


<a class='md-heading-link' name="w-signal-classes-w-signal-use" ></a>

### signal.use(names) -> `Promise.<Object>`

Use subject

| Param | Type | Description |
| ----- | --- | -------- |
| names | string | Name paths |


<a class='md-heading-link' name="w-signal-classes-w-signal-connect" ></a>

### signal.connect(signal) -> `Promise.<void>`

Connect to another signal

| Param | Type | Description |
| ----- | --- | -------- |
| signal | WSignal |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-disconnect" ></a>

### signal.disconnect(id) -> `Promise.<void>`

Disconnect another signal

| Param | Type | Description |
| ----- | --- | -------- |
| id |  |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-send" ></a>

### signal.send(config) -> `Promise.<*>`

Send message

| Param | Type | Description |
| ----- | --- | -------- |
| config |  |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-ask" ></a>

### signal.ask(subject, options) -> `Promise.<Object>`

Ask subject spec

| Param | Type | Description |
| ----- | --- | -------- |
| subject | string |  |
| options | Object |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-load" ></a>

### signal.load(Class, names) -> `object`

Load subject into the signal

| Param | Type | Description |
| ----- | --- | -------- |
| Class |  |  |
| names | string | Name paths |


<a class='md-heading-link' name="w-signal-classes-w-signal-use" ></a>

### signal.use(names) -> `Promise.<Object>`

Use subject

| Param | Type | Description |
| ----- | --- | -------- |
| names | string | Name paths |


<a class='md-heading-link' name="w-signal-classes-w-signal-connect" ></a>

### signal.connect(signal) -> `Promise.<void>`

Connect to another signal

| Param | Type | Description |
| ----- | --- | -------- |
| signal | WSignal |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-disconnect" ></a>

### signal.disconnect(id) -> `Promise.<void>`

Disconnect another signal

| Param | Type | Description |
| ----- | --- | -------- |
| id |  |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-send" ></a>

### signal.send(config) -> `Promise.<*>`

Send message

| Param | Type | Description |
| ----- | --- | -------- |
| config |  |  |


<a class='md-heading-link' name="w-signal-classes-w-signal-ask" ></a>

### signal.ask(subject, options) -> `Promise.<Object>`

Ask subject spec

| Param | Type | Description |
| ----- | --- | -------- |
| subject | string |  |
| options | Object |  |




