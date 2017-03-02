![badge](https://img.shields.io/badge/mendix-6.10.3-green.svg)

# Predefined Filters

Widget allows you to specify xpath queries in the model and then display buttons in the UI mapped to each of those queries. Currently works with Data Grids and List Views.

### Installation

1. Install the widget in your project
2. Include the widget on a page where you want to show a tour
3. Configure the widget's settings:
    1. On the **General** tab, Configure:
        1. `ListView` : set this to "Yes" if you want to add filters to a ListView, otherwise, leave false.
        2. `Mendix Name` : set the name of the Mendix element you're filtering, like "grid1" or "listView1".
        3. `XPATH filters`:
            1. `XPATH query` : the xpath query to run on this collection when the button is clicked. (It's often helpful to build this query in the actual XPATH builder for the collection element and then copy and paste in here)
            2. `Button text` : the text to show on the button.
            3. `Is Default?` : if "Yes", this filter will run on pageload. (only set this to "Yes" for one filter.)
    2. On the **Appearance** tab, Configure:
        1. `Show Filter Icon` : Set to "Yes" to display the Filter glyphicon on the buttons.
        2. `CSS Class for Buttons` : Any extra classes to add to the buttons
        3. `Show All Button` : Set to "Yes" to add a Show All button that removes any filters from the collection.

### Typical usage scenario

Useful for when you're currently using tabs to show Data Grids with different filters i.e. (My Tasks, My Open Tasks, All Tasks)

### Known Limitations

- the filter applied is applied in addition to any set in the modeler.
- the datasource of the listview must be XPATH

###### Based on the Mendix Widget Boilerplate

See [AppStoreWidgetBoilerplate](https://github.com/mendix/AppStoreWidgetBoilerplate/) for an example
