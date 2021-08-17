# Configuration

## What do we want
A way to configure these apps that users will understand. As simple as possible. This probably means:
* In-app configuration editing
* Some in-app wiring of configuration <-> app-db <-> derived and cached data


## Configuration is tricky 
Lots to think about!
* When should something be configured. When should it be compiled in.
* There's a lot to configure, and naming variables is hard. We are starting with organs and centres and tools, but these should be renamed - Domains, subdomains, tools perhaps
* Configuration should be linked to app behaviour immediately, so it is easy to see what
you have changed and what behaviour results.
* In development we start with a broad view (all organs, all centres, all tools).]
* Users start with a narrow view (one organ, one centre, one tool)

## Reloadable configurations
Should Configuration be **reloadable**. i.e. Can we have functions callable from the REPL, that reload new configuration. We don't have this yet so we are forced to refresh the browser to trigger a new configuration load.

## Editable configuration
Can we make a configuration editor in-app like we did for the translation tool?
It would be necessary to tag each piece of text with it's configuration source. But that is 
not so hard. Actually, that might work rather well for changes - use the tool as its own 
editor. When in edit mode, save out to a db. Export from the db to edn. Import the edn into
production code.

Effectively a CRUD interface for the editor, but triggered by on-screen context.

## Configuration vars have context
Top level config may be overridden by lower more specific levels in a tree of config vars.
Each variable therefore needs a hierarchical address.

## Configurations may be cached
Some displayed state can be derived and cached. Where this happens things will be more complex. Best not to cache if possible. Some (many) displays will depend on many configuration variables. This is simple to manage if the variables can be made reactive.

## Changes needed to make editing work
Currently, we import EDN files which contain nested maps of configuration variables reflecting the tree like nature of the app. The import happens on browser refresh, but not on
hot reload. That should be changed.

Many views reflect large generated large environmental maps derived from user context and initial configuration. These environments are usually not cached (good!), but the reverse path from display to configuration (needed for an in-app editor) is a little muddy.

## Document configuration -> view and back
We need to understand these pathways better for editing purposes. Can we mine event pathways?

## bb ?



