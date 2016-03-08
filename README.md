# Trolley Tracker

A Code for Fort Lauderdale project that updates and pushes city trolley location in real time. Built on Node, Express, and MongoDB.

## Concept

Trolley Tracker stores geospatial and speed information for a public city trolley.

## Get Trolley Locations

**Method**: GET. Returns the 20 most recent trolley data events.

    http://trolley-tracker.herokuapp.com/api/trolleys

### Query parameters:
| Parameter | Description | Type | Default Value | Required|
| -------------|---------------|-------|------------------|-----------|
| limit | The number of results returned| number| 10 | No |
| deviceId | The deviceId of the instrument on the trolly that collected the data| mixed | null | Yes |

### Response structure:
 + status (string) - Either 'success' or 'error'
 + data (object) - Data set
	+ type (string) - Type of data set
	+ features (object) - A collection of trolley data objects
		+ type (string) - Feature type
		+ geometry (string) - Geospatial data container
			+ type (string) - Type of geospatial data
			+ coordinates (array) [Latitude, Longitude]
		+ properties (object) Misc data container
			+ lat (number) Latitude
			+ lon (number) Longitude
			+ bustime (date) Datetime object in UTC
			+ speed (number) Trolley speed
			+ deviceid (mixed) Id of data collection device
 + message (string) - Description of error response

### Examples

Returns the latest trolley event object

    http://trolley-tracker.herokuapp.com/api/trolleys?limit=1

Returns only the latest 10 entries from deviceId 1

    http://trolley-tracker.herokuapp.com/api/trolleys?deviceId=1

Returns the latest 20 entries from deviceId 4

    http://trolley-tracker.herokuapp.com/api/trolleys?limit=20&deviceId=1

## Post Trolley Location
**Method**: GET. Accepts query parameters.

`http://trolley-tracker.herokuapp.com/api/trolleys/post?lat=26.203733&lng=-80.148749&speed=40&deviceId=4`

### Query parameters:
| Parameter | Description | Type | Default Value | Required|
| -------------|---------------|-------|------------------|-----------|
| lat | Latitude | number | null | Yes |
| lng | Longitude | numer | null | Yes |
| speed | Speed of trolley | number | null | Yes |
|deviceId | Id of device | mixed | null | Yes |

### Response structure:
Same as GET index.

### Example
`http://trolley-tracker.herokuapp.com/api/trolleys/post?lat=26.203733&lng=-80.148749&speed=40&deviceId=trolley-4`

## Delete Trolley Database
**Method**: GET. Requires a predefined token that is stored on the server in the `config` file as a parameter in production.

`http://trolley-tracker.herokuapp.com/api/trolleys/delete?token=delete-all-the-things`

In production on a Heroku server, at `https://dashboard.heroku.com/apps/{my-app}/settings` add a config var `DELETE_TOKEN` to a secret string. Or, in a command line interface with a Heroku app initiated, type `heroku config:set GITHUB_USERNAME=joesmithheroku config:set DELETE_TOKEN=my-super-duper-secret-delete-token`.

### Query parameters:
| Parameter | Description | Type | Default Value | Required|
| -------------|---------------|-------|------------------|-----------|
| token | The secret token to authenticate the delete request | string | null | Yes |

###Example
`http://trolley-tracker.herokuapp.com/api/trolleys/delete?token=my-super-duper-secret-delete-token`


### Response structure:
 + status (string) - Either 'success' or 'error'
 + data (object) - Data set, only placed for consistency.
 + message (string) - Description of error response