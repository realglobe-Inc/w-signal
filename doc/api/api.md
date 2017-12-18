# w-spot@2.0.3

Signal converter for w

+ Functions
  + [create(args)](#w-spot-function-create)
  + [cacheMix(Class)](#w-spot-function-cache-mix)
  + [specMix(Class)](#w-spot-function-spec-mix)
  + [spotMix(Class)](#w-spot-function-spot-mix)
  + [baseMix(Class)](#w-spot-function-base-mix)
+ [`WSpot`](#w-spot-classes) Class
  + [new WSpot(id)](#w-spot-classes-w-spot-constructor)
  + [spot.load(Class, names)](#w-spot-classes-w-spot-load)
  + [spot.use(names)](#w-spot-classes-w-spot-use)
  + [spot.connect(spot)](#w-spot-classes-w-spot-connect)
  + [spot.disconnect(id)](#w-spot-classes-w-spot-disconnect)
  + [spot.send(config)](#w-spot-classes-w-spot-send)
  + [spot.load(Class, names)](#w-spot-classes-w-spot-load)
  + [spot.use(names)](#w-spot-classes-w-spot-use)
  + [spot.connect(spot)](#w-spot-classes-w-spot-connect)
  + [spot.disconnect(id)](#w-spot-classes-w-spot-disconnect)
  + [spot.send(config)](#w-spot-classes-w-spot-send)

## Functions

<a class='md-heading-link' name="w-spot-function-create" ></a>

### create(args) -> `WSpot`

Create a WSpot instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |

<a class='md-heading-link' name="w-spot-function-cache-mix" ></a>

### cacheMix(Class) -> `function`

Cache mix

| Param | Type | Description |
| ----- | --- | -------- |
| Class | function | Class to mix |

<a class='md-heading-link' name="w-spot-function-spec-mix" ></a>

### specMix(Class) -> `function`

Mixin spec

| Param | Type | Description |
| ----- | --- | -------- |
| Class | function | Class to mix |

<a class='md-heading-link' name="w-spot-function-spot-mix" ></a>

### spotMix(Class) -> `function`

Spot mix

| Param | Type | Description |
| ----- | --- | -------- |
| Class | function | Class to mix |

<a class='md-heading-link' name="w-spot-function-base-mix" ></a>

### baseMix(Class) -> `function`

Mixin base

| Param | Type | Description |
| ----- | --- | -------- |
| Class | function | Class to mix |



<a class='md-heading-link' name="w-spot-classes"></a>

## `WSpot` Class

WSpot




<a class='md-heading-link' name="w-spot-classes-w-spot-constructor" ></a>

### new WSpot(id)

Constructor of WSpot class

| Param | Type | Description |
| ----- | --- | -------- |
| id | string | Id for spot |


<a class='md-heading-link' name="w-spot-classes-w-spot-load" ></a>

### spot.load(Class, names) -> `object`

Load subject into the spot

| Param | Type | Description |
| ----- | --- | -------- |
| Class |  |  |
| names | string | Name paths |


<a class='md-heading-link' name="w-spot-classes-w-spot-use" ></a>

### spot.use(names) -> `Promise.<Object>`

Use subject

| Param | Type | Description |
| ----- | --- | -------- |
| names | string | Name paths |


<a class='md-heading-link' name="w-spot-classes-w-spot-connect" ></a>

### spot.connect(spot) -> `Promise.<void>`

Connect to another spot

| Param | Type | Description |
| ----- | --- | -------- |
| spot | WSpot |  |


<a class='md-heading-link' name="w-spot-classes-w-spot-disconnect" ></a>

### spot.disconnect(id) -> `Promise.<void>`

Disconnect another spot

| Param | Type | Description |
| ----- | --- | -------- |
| id |  |  |


<a class='md-heading-link' name="w-spot-classes-w-spot-send" ></a>

### spot.send(config) -> `Promise.<*>`

Send message

| Param | Type | Description |
| ----- | --- | -------- |
| config |  |  |


<a class='md-heading-link' name="w-spot-classes-w-spot-load" ></a>

### spot.load(Class, names) -> `object`

Load subject into the spot

| Param | Type | Description |
| ----- | --- | -------- |
| Class |  |  |
| names | string | Name paths |


<a class='md-heading-link' name="w-spot-classes-w-spot-use" ></a>

### spot.use(names) -> `Promise.<Object>`

Use subject

| Param | Type | Description |
| ----- | --- | -------- |
| names | string | Name paths |


<a class='md-heading-link' name="w-spot-classes-w-spot-connect" ></a>

### spot.connect(spot) -> `Promise.<void>`

Connect to another spot

| Param | Type | Description |
| ----- | --- | -------- |
| spot | WSpot |  |


<a class='md-heading-link' name="w-spot-classes-w-spot-disconnect" ></a>

### spot.disconnect(id) -> `Promise.<void>`

Disconnect another spot

| Param | Type | Description |
| ----- | --- | -------- |
| id |  |  |


<a class='md-heading-link' name="w-spot-classes-w-spot-send" ></a>

### spot.send(config) -> `Promise.<*>`

Send message

| Param | Type | Description |
| ----- | --- | -------- |
| config |  |  |




