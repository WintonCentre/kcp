(ns transplants.plugins
  "Functions in this namespace are adapters for external plugins. The intent is to put the coupling
   between internal translpants data structures here so necessary values can be injected into a plugin.
   
   It's a layer of indirection between a (potentially external) plugin and its internal interface
   
   THINGS TO THINK THROUGH:
   
   * What API should the plugin conform to which to give sufficient flexibility?
   * What kind of plugins would be useful?
     - Pure calculations - e.g. splines
     - Output components - e.g. new visualisations

   It feels like the re-frame mechanism can help here by treating a plugin as I/O. 
   We'd have plugin events like:
   
   :register-named-plugin
   :plugin-loaded
   :output-to-plugin
   :input-from-plugin
   
   This begins to remind me of Elm's port facility for external JS code. Maybe doesn't need to 
   use Web sockets like Elm does though? Is there any benefit to serialising data?
      
   Hmmm - not sure whether any of this helps yet. I can't see a way to avoid poducing both cljs and js code.
   We can't easily predict a future requirement unless it follows a template.
   
   So to avoid cljs expertise in future, we have to boilerplate the cljs end, and I guess that's what I was
   thinking by starting this file.
   
   ")

#_(comment
    
    
    
  (defn reg-calculation
    "Register a calculation"
    [name]
    (fn [inputs]
      outputs))

    )
