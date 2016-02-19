# Notes file

This is the backend to 954live. It will be independent from the Drupal website and use the JSONapi.org spec REST server to manage Drupal entities. Headless Drupal.


## Project goals
1. Event importers on client should be plugable. Will try to build them by dependency injection. It will start with only using the TicketMaster API.
It needs to be able to define different types of event information sources, menu item (?), and a map between the JSON object properties and database fields.
2. Authentication is not an immediate concern. Keep in mind people should be able to manage their own information. So much overhead. Provide for node edit access for user reference. That way several people can own a content type, ie. a venue, event, or artist.
3. Create a media entity type for images so that images can contain photographer attribution and link. Absolute position attribution on image.
4. Create a taxonomy term for every [TicketMaster market](http://ticketmaster-api.github.io/products-and-docs/apis/discovery/#supported-markets) to attach to each event.
5. Use dependency injection to define search information importers from different sources to normalize information for information types.
.... For example, [get access token to facebook graph api](http://stackoverflow.com/questions/7633234/get-public-page-statuses-using-facebook-graph-api-without-access-token)
.... Make artist information available to [importing](https://developers.facebook.com/docs/graph-api/reference/page/). https://graph.facebook.com/v2.5/DeLongMusic?fields=band_members,description,bio&access_token=SECRET_ACCESS_TOKEN

## Todo
1. Define directory structure.

## Misc
1. Don't have a MEAN generator that isn't complicated so I'm trying this scratch.
2.