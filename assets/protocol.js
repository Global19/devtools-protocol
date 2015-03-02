protocol = {
    "version": { "major": "1", "minor": "1" },
    "domains": [{
        "domain": "Inspector",
        "hidden": true,
        "types": [],
        "commands": [
            {
                "name": "enable",
                "description": "Enables inspector domain notifications."
            },
            {
                "name": "disable",
                "description": "Disables inspector domain notifications."
            },
            {
                "name": "reset",
                "description": "Resets all domains."
            }
        ],
        "events": [
            {
                "name": "evaluateForTestInFrontend",
                "parameters": [
                    { "name": "testCallId", "type": "integer" },
                    { "name": "script", "type": "string" }
                ]
            },
            {
                "name": "inspect",
                "parameters": [
                    { "name": "object", "$ref": "Runtime.RemoteObject" },
                    { "name": "hints", "type": "object" }
                ]
            },
            {
                "name": "detached",
                "description": "Fired when remote debugging connection is about to be terminated. Contains detach reason.",
                "parameters": [
                    { "name": "reason", "type": "string", "description": "The reason why connection has been terminated." }
                ],
                "handlers": ["browser"]
            },
            {
                "name": "targetCrashed",
                "description": "Fired when debugging target has crashed",
                "handlers": ["browser"]
            }
        ]
    },
    {
        "domain": "Memory",
        "hidden": true,
        "commands": [
            {
                "name": "getDOMCounters",
                "returns": [
                    { "name": "documents", "type": "integer" },
                    { "name": "nodes", "type": "integer" },
                    { "name": "jsEventListeners", "type": "integer" }
                ]
            }
        ]
    },
    {
        "domain": "Page",
        "description": "Actions and events related to the inspected page belong to the page domain.",
        "types": [
            {
                "id": "ResourceType",
                "type": "string",
                "enum": ["Document", "Stylesheet", "Image", "Media", "Font", "Script", "TextTrack", "XHR", "WebSocket", "Other"],
                "description": "Resource type as it was perceived by the rendering engine."
            },
            {
              "id": "FrameId",
              "type": "string",
              "description": "Unique frame identifier."
            },
            {
                "id": "Frame",
                "type": "object",
                "description": "Information about the Frame on the page.",
                "properties": [
                    { "name": "id", "type": "string", "description": "Frame unique identifier." },
                    { "name": "parentId", "type": "string", "optional": true, "description": "Parent frame identifier." },
                    { "name": "loaderId", "$ref": "Network.LoaderId", "description": "Identifier of the loader associated with this frame." },
                    { "name": "name", "type": "string", "optional": true, "description": "Frame's name as specified in the tag." },
                    { "name": "url", "type": "string", "description": "Frame document's URL." },
                    { "name": "securityOrigin", "type": "string", "description": "Frame document's security origin." },
                    { "name": "mimeType", "type": "string", "description": "Frame document's mimeType as determined by the browser." }
                ]
            },
            {
                "id": "FrameResourceTree",
                "type": "object",
                "description": "Information about the Frame hierarchy along with their cached resources.",
                "properties": [
                    { "name": "frame", "$ref": "Frame", "description": "Frame information for this tree item." },
                    { "name": "childFrames", "type": "array", "optional": true, "items": { "$ref": "FrameResourceTree" }, "description": "Child frames." },
                    { "name": "resources", "type": "array",
                        "items": {
                            "type": "object",
                            "properties": [
                                { "name": "url", "type": "string", "description": "Resource URL." },
                                { "name": "type", "$ref": "ResourceType", "description": "Type of this resource." },
                                { "name": "mimeType", "type": "string", "description": "Resource mimeType as determined by the browser." },
                                { "name": "failed", "type": "boolean", "optional": true, "description": "True if the resource failed to load." },
                                { "name": "canceled", "type": "boolean", "optional": true, "description": "True if the resource was canceled during loading." }
                            ]
                        },
                        "description": "Information about frame resources."
                    }
                ],
                "hidden": true
            },
            {
                "id": "SearchMatch",
                "type": "object",
                "description": "Search match for resource.",
                "properties": [
                    { "name": "lineNumber", "type": "number", "description": "Line number in resource content." },
                    { "name": "lineContent", "type": "string", "description": "Line with match content." }
                ],
                "hidden": true
            },
            {
                "id": "Cookie",
                "type": "object",
                "description": "Cookie object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Cookie name." },
                    { "name": "value", "type": "string", "description": "Cookie value." },
                    { "name": "domain", "type": "string", "description": "Cookie domain." },
                    { "name": "path", "type": "string", "description": "Cookie path." },
                    { "name": "expires", "type": "number", "description": "Cookie expires." },
                    { "name": "size", "type": "integer", "description": "Cookie size." },
                    { "name": "httpOnly", "type": "boolean", "description": "True if cookie is http-only." },
                    { "name": "secure", "type": "boolean", "description": "True if cookie is secure." },
                    { "name": "session", "type": "boolean", "description": "True in case of session cookie." }
                ],
                "hidden": true
            },
            {
                "id": "ScriptIdentifier",
                "type": "string",
                "description": "Unique script identifier.",
                "hidden": true
            },
            {
                "id": "NavigationEntry",
                "type": "object",
                "description": "Navigation history entry.",
                "properties": [
                  { "name": "id", "type": "integer", "description": "Unique id of the navigation history entry." },
                  { "name": "url", "type": "string", "description": "URL of the navigation history entry." },
                  { "name": "title", "type": "string", "description": "Title of the navigation history entry." }
                ],
                "hidden": true
            },
            {
                "id": "Quota",
                "type": "object",
                "description": "Quota information",
                "properties": [
                    { "name": "temporary", "type": "number", "description": "Quota for temporary storage shared among all security origins" },
                    { "name": "persistent", "type": "number", "description": "Quota for persistent storage for the security origin." }
                ],
                "hidden": true
            },
            {
                "id": "Usage",
                "type": "object",
                "description": "Usage information",
                "properties": [
                    { "name": "temporary", "type": "array", "items": { "$ref": "Page.UsageItem" }, "description": "Temporary storage usage." },
                    { "name": "persistent", "type": "array", "items": { "$ref": "Page.UsageItem" }, "description": "Persistent storage usage." },
                    { "name": "syncable", "type": "array", "items": { "$ref": "Page.UsageItem" }, "description": "Syncable storage." }
                ],
                "hidden": true
            },
            {
                "id": "UsageItem",
                "type": "object",
                "description": "Usage information for a client and storage type",
                "properties": [
                    { "name": "id", "type": "string", "enum": ["filesystem", "database", "appcache", "indexeddatabase"], "description": "Item id." },
                    { "name": "value", "type": "number", "description": "Item usage value." }
                ],
                "hidden": true
            },
            {
                "id": "Viewport",
                "type": "object",
                "description": "Visible page viewport",
                "properties": [
                    { "name": "scrollX", "type": "number", "description": "X scroll offset in CSS pixels." },
                    { "name": "scrollY", "type": "number", "description": "Y scroll offset in CSS pixels." },
                    { "name": "contentsWidth", "type": "number", "description": "Contents width in CSS pixels." },
                    { "name": "contentsHeight", "type": "number", "description": "Contents height in CSS pixels." },
                    { "name": "pageScaleFactor", "type": "number", "description": "Page scale factor." },
                    { "name": "minimumPageScaleFactor", "type": "number", "description": "Minimum page scale factor." },
                    { "name": "maximumPageScaleFactor", "type": "number", "description": "Maximum page scale factor." }
                ],
                "hidden": true
            },
            {
                "id": "ScreencastFrameMetadata",
                "type": "object",
                "description": "Screencast frame metadata",
                "properties": [
                    { "name": "offsetTop", "type": "number", "hidden": true, "description": "Top offset in DIP." },
                    { "name": "pageScaleFactor", "type": "number", "hidden": true, "description": "Page scale factor." },
                    { "name": "deviceWidth", "type": "number", "hidden": true, "description": "Device screen width in DIP." },
                    { "name": "deviceHeight", "type": "number", "hidden": true, "description": "Device screen height in DIP." },
                    { "name": "scrollOffsetX", "type": "number", "hidden": true, "description": "Position of horizontal scroll in CSS pixels." },
                    { "name": "scrollOffsetY", "type": "number", "hidden": true, "description": "Position of vertical scroll in CSS pixels." },
                    { "name": "timestamp", "type": "number", "optional": true, "hidden": true, "description": "Frame swap timestamp." }
                ],
                "hidden": true
            },
            {
                "id": "RecordedFrame",
                "type": "object",
                "description": "Compressed frame data.",
                "properties": [
                    { "name": "data", "type": "string", "description": "Base64-encoded compressed image." },
                    { "name": "timestamp", "type": "number", "description": "Frame swap timestamp." }
                ],
                "hidden": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables page domain notifications.",
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "disable",
                "description": "Disables page domain notifications.",
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "addScriptToEvaluateOnLoad",
                "parameters": [
                    { "name": "scriptSource", "type": "string" }
                ],
                "returns": [
                    { "name": "identifier", "$ref": "ScriptIdentifier", "description": "Identifier of the added script." }
                ],
                "hidden": true
            },
            {
                "name": "removeScriptToEvaluateOnLoad",
                "parameters": [
                    { "name": "identifier", "$ref": "ScriptIdentifier" }
                ],
                "hidden": true
            },
            {
                "name": "reload",
                "parameters": [
                    { "name": "ignoreCache", "type": "boolean", "optional": true, "description": "If true, browser cache is ignored (as if the user pressed Shift+refresh)." },
                    { "name": "scriptToEvaluateOnLoad", "type": "string", "optional": true, "description": "If set, the script will be injected into all frames of the inspected page after reload." }
                ],
                "description": "Reloads given page optionally ignoring the cache.",
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "navigate",
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL to navigate the page to." }
                ],
                "returns": [
                    { "name": "frameId", "$ref": "FrameId", "hidden": true, "description": "Frame id that will be navigated." }
                ],
                "description": "Navigates current page to the given URL.",
                "handlers": ["browser", "renderer"]
            },
            {
              "name": "getNavigationHistory",
              "parameters": [],
              "returns": [
                { "name": "currentIndex", "type": "integer", "description": "Index of the current navigation history entry." },
                { "name": "entries", "type": "array", "items": { "$ref": "NavigationEntry" }, "description": "Array of navigation history entries." }
              ],
              "description": "Returns navigation history for the current page.",
              "hidden": true,
              "handlers": ["browser"]
            },
            {
              "name": "navigateToHistoryEntry",
              "parameters": [
                  { "name": "entryId", "type": "integer", "description": "Unique id of the entry to navigate to." }
              ],
              "description": "Navigates current page to the given history entry.",
              "hidden": true,
              "handlers": ["browser"]
            },
            {
                "name": "getCookies",
                "returns": [
                    { "name": "cookies", "type": "array", "items": { "$ref": "Cookie" }, "description": "Array of cookie objects." }
                ],
                "description": "Returns all browser cookies. Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.",
                "hidden": true
            },
            {
                "name": "deleteCookie",
                "parameters": [
                    { "name": "cookieName", "type": "string", "description": "Name of the cookie to remove." },
                    { "name": "url", "type": "string", "description": "URL to match cooke domain and path." }
                ],
                "description": "Deletes browser cookie with given name, domain and path.",
                "hidden": true
            },
            {
                "name": "getResourceTree",
                "description": "Returns present frame / resource tree structure.",
                "returns": [
                    { "name": "frameTree", "$ref": "FrameResourceTree", "description": "Present frame / resource tree structure." }
                ],
                "hidden": true
            },
            {
                "name": "getResourceContent",
                "async": true,
                "description": "Returns content of the given resource.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id to get resource for." },
                    { "name": "url", "type": "string", "description": "URL of the resource to get content for." }
                ],
                "returns": [
                    { "name": "content", "type": "string", "description": "Resource content." },
                    { "name": "base64Encoded", "type": "boolean", "description": "True, if content was served as base64." }
                ],
                "hidden": true
            },
            {
                "name": "searchInResource",
                "description": "Searches for given string in resource content.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id for resource to search in." },
                    { "name": "url", "type": "string", "description": "URL of the resource to search in." },
                    { "name": "query", "type": "string", "description": "String to search for."  },
                    { "name": "caseSensitive", "type": "boolean", "optional": true, "description": "If true, search is case sensitive." },
                    { "name": "isRegex", "type": "boolean", "optional": true, "description": "If true, treats string parameter as regex." }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "SearchMatch" }, "description": "List of search matches." }
                ],
                "hidden": true
            },
            {
                "name": "setDocumentContent",
                "description": "Sets given markup as the document's HTML.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Frame id to set HTML for." },
                    { "name": "html", "type": "string", "description": "HTML content to set."  }
                ],
                "hidden": true
            },
            {
                "name": "setDeviceMetricsOverride",
                "description": "Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and \"device-width\"/\"device-height\"-related CSS media query results).",
                "parameters": [
                    { "name": "width", "type": "integer", "description": "Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "height", "type": "integer", "description": "Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override." },
                    { "name": "deviceScaleFactor", "type": "number", "description": "Overriding device scale factor value. 0 disables the override." },
                    { "name": "mobile", "type": "boolean", "description": "Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more." },
                    { "name": "fitWindow", "type": "boolean", "description": "Whether a view that exceeds the available browser window area should be scaled down to fit." },
                    { "name": "scale", "type": "number", "optional": true, "description": "Scale to apply to resulting view image. Ignored in |fitWindow| mode." },
                    { "name": "offsetX", "type": "number", "optional": true, "description": "X offset to shift resulting view image by. Ignored in |fitWindow| mode." },
                    { "name": "offsetY", "type": "number", "optional": true, "description": "Y offset to shift resulting view image by. Ignored in |fitWindow| mode." }
                ],
                "hidden": true
            },
            {
                "name": "clearDeviceMetricsOverride",
                "description": "Clears the overriden device metrics.",
                "hidden": true
            },
            {
                "name": "resetScrollAndPageScaleFactor",
                "description": "Requests that scroll offsets and page scale factor are reset to initial values.",
                "hidden": true
            },
            {
                "name": "setPageScaleFactor",
                "description": "Sets a specified page scale factor.",
                "parameters": [
                    { "name": "pageScaleFactor", "type": "number", "description": "Page scale factor." }
                ],
                "hidden": true
            },
            {
                "name": "setShowPaintRects",
                "description": "Requests that backend shows paint rectangles",
                "parameters": [
                    { "name": "result", "type": "boolean", "description": "True for showing paint rectangles" }
                ],
                "hidden": true
            },
            {
                "name": "setShowDebugBorders",
                "description": "Requests that backend shows debug borders on layers",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing debug borders" }
                ],
                "hidden": true
            },
            {
                "name": "setShowFPSCounter",
                "description": "Requests that backend shows the FPS counter",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing the FPS counter" }
                ],
                "hidden": true
            },
            {
                "name": "setContinuousPaintingEnabled",
                "description": "Requests that backend enables continuous painting",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "True for enabling cointinuous painting" }
                ],
                "hidden": true
            },
            {
                "name": "setShowScrollBottleneckRects",
                "description": "Requests that backend shows scroll bottleneck rects",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "True for showing scroll bottleneck rects" }
                ],
                "hidden": true
            },
            {
                "name": "getScriptExecutionStatus",
                "description": "Determines if scripts can be executed in the page.",
                "returns": [
                    { "name": "result", "type": "string", "enum": ["allowed", "disabled", "forbidden"], "description": "Script execution status: \"allowed\" if scripts can be executed, \"disabled\" if script execution has been disabled through page settings, \"forbidden\" if script execution for the given page is not possible for other reasons." }
                ],
                "hidden": true
            },
            {
                "name": "setScriptExecutionDisabled",
                "description": "Switches script execution in the page.",
                "parameters": [
                    { "name": "value", "type": "boolean", "description": "Whether script execution should be disabled in the page." }
                ],
                "hidden": true
            },
            {
                "name": "setGeolocationOverride",
                "description": "Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position unavailable.",
                "parameters": [
                    { "name": "latitude", "type": "number", "optional": true, "description": "Mock latitude"},
                    { "name": "longitude", "type": "number", "optional": true, "description": "Mock longitude"},
                    { "name": "accuracy", "type": "number", "optional": true, "description": "Mock accuracy"}
                ],
                "handlers": ["browser"]
            },
            {
                "name": "clearGeolocationOverride",
                "description": "Clears the overriden Geolocation Position and Error.",
                "handlers": ["browser"]
            },
            {
                "name": "setDeviceOrientationOverride",
                "description": "Overrides the Device Orientation.",
                "parameters": [
                    { "name": "alpha", "type": "number", "description": "Mock alpha"},
                    { "name": "beta", "type": "number", "description": "Mock beta"},
                    { "name": "gamma", "type": "number", "description": "Mock gamma"}
                ],
                "redirect": "DeviceOrientation",
                "hidden": true
            },
            {
                "name": "clearDeviceOrientationOverride",
                "description": "Clears the overridden Device Orientation.",
                "redirect": "DeviceOrientation",
                "hidden": true
            },
            {
                "name": "setTouchEmulationEnabled",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Whether the touch event emulation should be enabled." },
                    { "name": "configuration", "type": "string", "enum": ["mobile", "desktop"], "optional": true, "description": "Touch/gesture events configuration. Default: current platform." }
                ],
                "description": "Toggles mouse event-based touch event emulation.",
                "hidden": true,
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "setEmulatedMedia",
                "parameters": [
                    { "name": "media", "type": "string", "description": "Media type to emulate. Empty string disables the override." }
                ],
                "description": "Emulates the given media for CSS media queries.",
                "hidden": true
            },
            {
                "name": "captureScreenshot",
                "async": true,
                "description": "Capture page screenshot.",
                "parameters": [],
                "returns": [
                    { "name": "data", "type": "string", "description": "Base64-encoded image data (PNG)." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "canScreencast",
                "description": "Tells whether screencast is supported.",
                "returns": [
                  { "name": "result", "type": "boolean", "description": "True if screencast is supported." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "canEmulate",
                "description": "Tells whether emulation is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if emulation is supported." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "startScreencast",
                "description": "Starts sending each frame using the <code>screencastFrame</code> event.",
                "parameters": [
                    { "name": "format", "type": "string", "optional": true, "enum": ["jpeg", "png"], "description": "Image compression format." },
                    { "name": "quality", "type": "integer", "optional": true, "description": "Compression quality from range [0..100]." },
                    { "name": "maxWidth", "type": "integer", "optional": true, "description": "Maximum screenshot width." },
                    { "name": "maxHeight", "type": "integer", "optional": true, "description": "Maximum screenshot height." }
                ],
                "hidden": true,
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "stopScreencast",
                "description": "Stops sending each frame in the <code>screencastFrame</code>.",
                "hidden": true,
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "screencastFrameAck",
                "description": "Acknowledges that a screencast frame has been received by the frontend.",
                "parameters": [
                    { "name": "frameNumber", "type": "integer", "description": "Frame number." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "startRecordingFrames",
                "description": "Starts recording each frame to the buffer.",
                "parameters": [
                    { "name": "maxFrameCount", "type": "integer", "description": "Maximal number of frames to record from range. Actual maximum depends on implementation." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "stopRecordingFrames",
                "async": true,
                "description": "Stops recording, encodes and returns images.",
                "parameters": [
                ],
                "returns": [
                    { "name": "frames", "type": "array", "items": { "$ref": "RecordedFrame" }, "description": "Encoded recorded frames." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "handleJavaScriptDialog",
                "description": "Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).",
                "parameters": [
                    { "name": "accept", "type": "boolean", "description": "Whether to accept or dismiss the dialog." },
                    { "name": "promptText", "type": "string", "optional": true, "description": "The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "setShowViewportSizeOnResize",
                "description": "Paints viewport size upon main frame resize.",
                "parameters": [
                    { "name": "show", "type": "boolean", "description": "Whether to paint size or not." },
                    { "name": "showGrid", "type": "boolean", "optional": true, "description": "Whether to paint grid as well." }
                ],
                "hidden": true
            },
            {
                "name": "queryUsageAndQuota",
                "async": true,
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin quota and usage requested for" }
                ],
                "returns": [
                    { "name": "quota", "$ref": "Quota", "description": "Quota for requested security origin." },
                    { "name": "usage", "$ref": "Usage", "description": "Current usage for requested security origin." }
                ],
                "description": "Queries more detailed quota and usage data than Storage API provides.",
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "setColorPickerEnabled",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Shows / hides color picker" }
                ],
                "description": "Shows / hides color picker",
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "setOverlayMessage",
                "parameters": [
                    { "name": "message", "type": "string", "optional": true, "description": "Overlay message to display when paused in debugger." }
                ],
                "hidden": true,
                "description": "Sets overlay message."
            }
        ],
        "events": [
            {
                "name": "domContentEventFired",
                "parameters": [
                    { "name": "timestamp", "type": "number" }
                ]
            },
            {
                "name": "loadEventFired",
                "parameters": [
                    { "name": "timestamp", "type": "number" }
                ]
            },
            {
                "name": "frameAttached",
                "description": "Fired when frame has been attached to its parent.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has been attached." },
                    { "name": "parentFrameId", "$ref": "FrameId", "description": "Parent frame identifier." }
                ]
            },
            {
                "name": "frameNavigated",
                "description": "Fired once navigation of the frame has completed. Frame is now associated with the new loader.",
                "parameters": [
                    { "name": "frame", "$ref": "Frame", "description": "Frame object." }
                ]
            },
            {
                "name": "frameDetached",
                "description": "Fired when frame has been detached from its parent.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has been detached." }
                ]
            },
            {
                "name": "frameStartedLoading",
                "description": "Fired when frame has started loading.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has started loading." }
                ],
                "hidden": true
            },
            {
                "name": "frameStoppedLoading",
                "description": "Fired when frame has stopped loading.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has stopped loading." }
                ],
                "hidden": true
            },
            {
                "name": "frameScheduledNavigation",
                "description": "Fired when frame schedules a potential navigation.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has scheduled a navigation." },
                    { "name": "delay", "type": "number", "description": "Delay (in seconds) until the navigation is scheduled to begin. The navigation is not guaranteed to start." }
                ],
                "hidden": true
            },
            {
                "name": "frameClearedScheduledNavigation",
                "description": "Fired when frame no longer has a scheduled navigation.",
                "parameters": [
                    { "name": "frameId", "$ref": "FrameId", "description": "Id of the frame that has cleared its scheduled navigation." }
                ],
                "hidden": true
            },
            {
                "name": "frameResized",
                "hidden": true
            },
            {
                "name": "javascriptDialogOpening",
                "description": "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) is about to open.",
                "parameters": [
                    { "name": "message", "type": "string", "description": "Message that will be displayed by the dialog." }
                ],
                "hidden": true
            },
            {
                "name": "javascriptDialogClosed",
                "description": "Fired when a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload) has been closed.",
                "hidden": true
            },
            {
                "name": "scriptsEnabled",
                "description": "Fired when the JavaScript is enabled/disabled on the page",
                "parameters": [
                    { "name": "isEnabled", "type": "boolean", "description": "Whether script execution is enabled or disabled on the page." }
                ],
                "hidden": true
            },
            {
                "name": "screencastFrame",
                "description": "Compressed image data requested by the <code>startScreencast</code>.",
                "parameters": [
                    { "name": "data", "type": "string", "description": "Base64-encoded compressed image." },
                    { "name": "metadata", "$ref": "ScreencastFrameMetadata", "description": "Screencast frame metadata."},
                    { "name": "frameNumber", "type": "integer", "optional": true, "description": "Frame number."}
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "screencastVisibilityChanged",
                "description": "Fired when the page with currently enabled screencast was shown or hidden </code>.",
                "parameters": [
                    { "name": "visible", "type": "boolean", "description": "True if the page is visible." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "viewportChanged",
                "description": "Fired when a visible page viewport has changed.",
                "parameters": [
                    { "name": "viewport", "$ref": "Viewport", "description": "Viewport description." }
                ],
                "hidden": true
            },
            {
                "name": "colorPicked",
                "description": "Fired when a color has been picked.",
                "parameters": [
                    { "name": "color", "$ref": "DOM.RGBA", "description": "RGBA of the picked color." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "interstitialShown",
                "description": "Fired when interstitial page was shown",
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "interstitialHidden",
                "description": "Fired when interstitial page was hidden",
                "hidden": true,
                "handlers": ["browser"]
            }
        ]
    },
    {
        "domain": "Runtime",
        "description": "Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.",
        "types": [
            {
                "id": "RemoteObjectId",
                "type": "string",
                "description": "Unique object identifier."
            },
            {
                "id": "RemoteObject",
                "type": "object",
                "description": "Mirror object referencing original JavaScript object.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." },
                    { "name": "className", "type": "string", "optional": true, "description": "Object class (constructor) name. Specified for <code>object</code> type values only." },
                    { "name": "value", "type": "any", "optional": true, "description": "Remote object value in case of primitive values or JSON values (if it was requested), or description string if the value can not be JSON-stringified (like NaN, Infinity, -Infinity, -0)." },
                    { "name": "description", "type": "string", "optional": true, "description": "String representation of the object." },
                    { "name": "objectId", "$ref": "RemoteObjectId", "optional": true, "description": "Unique object identifier (for non-primitive values)." },
                    { "name": "preview", "$ref": "ObjectPreview", "optional": true, "description": "Preview containing abbreviated property values. Specified for <code>object</code> type values only.", "hidden": true },
                    { "name": "customPreview", "$ref": "CustomPreview", "optional": true, "hidden": true}
                ]
            },
            {   "id": "CustomPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "header", "type": "string"},
                    { "name": "hasBody", "type": "boolean"}
                ]
            },
            {
                "id": "ObjectPreview",
                "type": "object",
                "hidden": true,
                "description": "Object containing abbreviated remote object value.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." },
                    { "name": "description", "type": "string", "optional": true, "description": "String representation of the object." },
                    { "name": "lossless", "type": "boolean", "description": "Determines whether preview is lossless (contains all information of the original object)." },
                    { "name": "overflow", "type": "boolean", "description": "True iff some of the properties or entries of the original object did not fit." },
                    { "name": "properties", "type": "array", "items": { "$ref": "PropertyPreview" }, "description": "List of the properties." },
                    { "name": "entries", "type": "array", "items": { "$ref": "EntryPreview" }, "optional": true, "description": "List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only." }
                ]
            },
            {
                "id": "PropertyPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "name", "type": "string", "description": "Property name." },
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol", "accessor"], "description": "Object type. Accessor means that the property itself is an accessor property." },
                    { "name": "value", "type": "string", "optional": true, "description": "User-friendly property value string." },
                    { "name": "valuePreview", "$ref": "ObjectPreview", "optional": true, "description": "Nested value preview." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." }
                ]
            },
            {
                "id": "EntryPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "key", "$ref": "ObjectPreview", "optional": true, "description": "Preview of the key. Specified for map-like collection entries." },
                    { "name": "value", "$ref": "ObjectPreview", "description": "Preview of the value." }
                ]
            },
            {
                "id": "PropertyDescriptor",
                "type": "object",
                "description": "Object property descriptor.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Property name or symbol description." },
                    { "name": "value", "$ref": "RemoteObject", "optional": true, "description": "The value associated with the property." },
                    { "name": "writable", "type": "boolean", "optional": true, "description": "True if the value associated with the property may be changed (data descriptors only)." },
                    { "name": "get", "$ref": "RemoteObject", "optional": true, "description": "A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only)." },
                    { "name": "set", "$ref": "RemoteObject", "optional": true, "description": "A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only)." },
                    { "name": "configurable", "type": "boolean", "description": "True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object." },
                    { "name": "enumerable", "type": "boolean", "description": "True if this property shows up during enumeration of the properties on the corresponding object." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "isOwn", "optional": true, "type": "boolean", "description": "True if the property is owned for the object.", "hidden": true },
                    { "name": "symbol", "$ref": "RemoteObject", "optional": true, "description": "Property symbol object, if the property is of the <code>symbol</code> type.", "hidden": true }
                ]
            },
            {
                "id": "InternalPropertyDescriptor",
                "type": "object",
                "description": "Object internal property descriptor. This property isn't normally visible in JavaScript code.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Conventional property name." },
                    { "name": "value", "$ref": "RemoteObject", "optional": true, "description": "The value associated with the property." }
                ],
                "hidden": true
            },
            {
                "id": "CallArgument",
                "type": "object",
                "description": "Represents function call argument. Either remote object id <code>objectId</code> or primitive <code>value</code> or neither of (for undefined) them should be specified.",
                "properties": [
                    { "name": "value", "type": "any", "optional": true, "description": "Primitive value, or description string if the value can not be JSON-stringified (like NaN, Infinity, -Infinity, -0)." },
                    { "name": "objectId", "$ref": "RemoteObjectId", "optional": true, "description": "Remote object handle." },
                    { "name": "type", "optional": true, "hidden": true, "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." }
                ]
            },
            {
                "id": "ExecutionContextId",
                "type": "integer",
                "description": "Id of an execution context."
            },
            {
                "id": "ExecutionContextDescription",
                "type": "object",
                "description": "Description of an isolated world.",
                "properties": [
                    { "name": "id", "$ref": "ExecutionContextId", "description": "Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed." },
                    { "name": "isPageContext", "type": "boolean", "description": "True if this is a context where inpspected web page scripts run. False if it is a content script isolated context.", "hidden": true },
                    { "name": "origin", "type": "string", "description": "Execution context origin.", "hidden": true},
                    { "name": "name", "type": "string", "description": "Human readable name describing given context.", "hidden": true},
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Id of the owning frame." }
                ]
            }
        ],
        "commands": [
            {
                "name": "evaluate",
                "parameters": [
                    { "name": "expression", "type": "string", "description": "Expression to evaluate." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." },
                    { "name": "includeCommandLineAPI", "type": "boolean", "optional": true, "description": "Determines whether Command Line API should be available during the evaluation.", "hidden": true },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "contextId", "$ref": "Runtime.ExecutionContextId", "optional": true, "description": "Specifies in which isolated context to perform evaluation. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page." },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object that should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." }
                ],
                "returns": [
                    { "name": "result", "$ref": "RemoteObject", "description": "Evaluation result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "exceptionDetails", "$ref": "Debugger.ExceptionDetails", "optional": true, "hidden": true, "description": "Exception details."}
                ],
                "description": "Evaluates expression on global object."
            },
            {
                "name": "callFunctionOn",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to call function on." },
                    { "name": "functionDeclaration", "type": "string", "description": "Declaration of the function to call." },
                    { "name": "arguments", "type": "array", "items": { "$ref": "CallArgument", "description": "Call argument." }, "optional": true, "description": "Call arguments. All call arguments must belong to the same JavaScript world as the target object." },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether function call should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object which should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." }
                ],
                "returns": [
                    { "name": "result", "$ref": "RemoteObject", "description": "Call result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." }
                ],
                "description": "Calls function with given declaration on the given object. Object group of the result is inherited from the target object."
            },
            {
                "name": "getProperties",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to return properties for." },
                    { "name": "ownProperties", "optional": true, "type": "boolean", "description": "If true, returns properties belonging only to the element itself, not to its prototype chain." },
                    { "name": "accessorPropertiesOnly", "optional": true, "type": "boolean", "description": "If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.", "hidden": true }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "PropertyDescriptor" }, "description": "Object properties." },
                    { "name": "internalProperties", "optional": true, "type": "array", "items": { "$ref": "InternalPropertyDescriptor" }, "description": "Internal object properties (only of the element itself).", "hidden": true }
                ],
                "description": "Returns properties of a given object. Object group of the result is inherited from the target object."
            },
            {
                "name": "releaseObject",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to release." }
                ],
                "description": "Releases remote object with given id."
            },
            {
                "name": "releaseObjectGroup",
                "parameters": [
                    { "name": "objectGroup", "type": "string", "description": "Symbolic object group name." }
                ],
                "description": "Releases all remote objects that belong to a given group."
            },
            {
                "name": "run",
                "hidden": true,
                "description": "Tells inspected instance(worker or page) that it can run in case it was started paused."
            },
            {
                "name": "enable",
                "description": "Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context."
            },
            {
                "name": "disable",
                "hidden": true,
                "description": "Disables reporting of execution contexts creation."
            },
            {
                "name": "isRunRequired",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if the Runtime is in paused on start state." }
                ],
                "hidden": true
            },
            {
                "name": "setCustomObjectFormatterEnabled",
                "parameters": [
                    {
                        "name": "enabled",
                        "type": "boolean"
                    }
                ],
                "hidden": true
            }
        ],
        "events": [
            {
                "name": "executionContextCreated",
                "parameters": [
                    { "name": "context", "$ref": "ExecutionContextDescription", "description": "A newly created execution contex." }
                ],
                "description": "Issued when new execution context is created."
            },
            {
                "name": "executionContextDestroyed",
                "parameters": [
                    { "name": "executionContextId", "$ref": "ExecutionContextId", "description": "Id of the destroyed context" }
                ],
                "description": "Issued when execution context is destroyed."
            },
            {
                "name": "executionContextsCleared",
                "description": "Issued when all executionContexts were cleared in browser"
            }
        ]
    },
    {
        "domain": "Console",
        "description": "Console domain defines methods and events for interaction with the JavaScript console. Console collects messages created by means of the <a href='http://getfirebug.com/wiki/index.php/Console_API'>JavaScript Console API</a>. One needs to enable this domain using <code>enable</code> command in order to start receiving the console messages. Browser collects messages issued while console domain is not enabled as well and reports them using <code>messageAdded</code> notification upon enabling.",
        "types": [
            {
                "id": "Timestamp",
                "type": "number",
                "description": "Number of seconds since epoch.",
                "hidden": true
            },
            {
                "id": "ConsoleMessage",
                "type": "object",
                "description": "Console message.",
                "properties": [
                    { "name": "source", "type": "string", "enum": ["xml", "javascript", "network", "console-api", "storage", "appcache", "rendering", "css", "security", "other", "deprecation"], "description": "Message source." },
                    { "name": "level", "type": "string", "enum": ["log", "warning", "error", "debug", "info"], "description": "Message severity." },
                    { "name": "text", "type": "string", "description": "Message text." },
                    { "name": "type", "type": "string", "optional": true, "enum": ["log", "dir", "dirxml", "table", "trace", "clear", "startGroup", "startGroupCollapsed", "endGroup", "assert", "profile", "profileEnd"], "description": "Console message type." },
                    { "name": "scriptId", "type": "string", "optional": true, "description": "Script ID of the message origin." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the message origin." },
                    { "name": "line", "type": "integer", "optional": true, "description": "Line number in the resource that generated this message." },
                    { "name": "column", "type": "integer", "optional": true, "description": "Column number in the resource that generated this message." },
                    { "name": "repeatCount", "type": "integer", "optional": true, "description": "Repeat count for repeated messages." },
                    { "name": "parameters", "type": "array", "items": { "$ref": "Runtime.RemoteObject" }, "optional": true, "description": "Message parameters in case of the formatted message." },
                    { "name": "stackTrace", "$ref": "StackTrace", "optional": true, "description": "JavaScript stack trace for assertions and error messages." },
                    { "name": "asyncStackTrace", "$ref": "AsyncStackTrace", "optional": true, "description": "Asynchronous JavaScript stack trace that preceded this message, if available.", "hidden": true },
                    { "name": "networkRequestId", "$ref": "Network.RequestId", "optional": true, "description": "Identifier of the network request associated with this message." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp, when this message was fired.", "hidden": true },
                    { "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "optional": true, "description": "Identifier of the context where this message was created", "hidden": true }
                ]
            },
            {
                "id": "CallFrame",
                "type": "object",
                "description": "Stack entry for console errors and assertions.",
                "properties": [
                    { "name": "functionName", "type": "string", "description": "JavaScript function name." },
                    { "name": "scriptId", "type": "string", "description": "JavaScript script id." },
                    { "name": "url", "type": "string", "description": "JavaScript script name or url." },
                    { "name": "lineNumber", "type": "integer", "description": "JavaScript script line number." },
                    { "name": "columnNumber", "type": "integer", "description": "JavaScript script column number." }
                ]
            },
            {
                "id": "StackTrace",
                "type": "array",
                "items": { "$ref": "CallFrame" },
                "description": "Call frames for assertions or error messages."
            },
            {
                "id": "AsyncStackTrace",
                "type": "object",
                "properties": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call frames of the stack trace." },
                    { "name": "description", "type": "string", "optional": true, "description": "String label of this stack trace. For async traces this may be a name of the function that initiated the async call." },
                    { "name": "asyncStackTrace", "$ref": "AsyncStackTrace", "optional": true, "description": "Next asynchronous stack trace, if any." }
                ],
                "description": "Asynchronous JavaScript call stack.",
                "hidden": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification."
            },
            {
                "name": "disable",
                "description": "Disables console domain, prevents further console messages from being reported to the client."
            },
            {
                "name": "clearMessages",
                "description": "Clears console messages collected in the browser."
            },
            {
                "name": "setLastEvaluationResult",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Identifier of the object to set as last evaluation result." }
                ],
                "hidden": true,
                "description": "Sets last evaluation result in console. Can be accessed via <code>$_</code> command line API."
            }
        ],
        "events": [
            {
                "name": "messageAdded",
                "parameters": [
                    { "name": "message", "$ref": "ConsoleMessage", "description": "Console message that has been added." }
                ],
                "description": "Issued when new console message is added."
            },
            {
                "name": "messageRepeatCountUpdated",
                "parameters": [
                    { "name": "count", "type": "integer", "description": "New repeat count value." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp of most recent message in batch.", "hidden": true }
                ],
                "description": "Is not issued. Will be gone in the future versions of the protocol.",
                "deprecated": true
            },
            {
                "name": "messagesCleared",
                "description": "Issued when console is cleared. This happens either upon <code>clearMessages</code> command or after page navigation."
            }
        ]
    },
    {
        "domain": "Network",
        "description": "Network domain allows tracking network activities of the page. It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.",
        "types": [
            {
                "id": "LoaderId",
                "type": "string",
                "description": "Unique loader identifier."
            },
            {
                "id": "RequestId",
                "type": "string",
                "description": "Unique request identifier."
            },
            {
                "id": "Timestamp",
                "type": "number",
                "description": "Number of seconds since epoch."
            },
            {
                "id": "Headers",
                "type": "object",
                "description": "Request / response headers as keys / values of JSON object."
            },
            {
                "id": "ResourceTiming",
                "type": "object",
                "description": "Timing information for the request.",
                "properties": [
                    { "name": "requestTime", "type": "number", "description": "Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime." },
                    { "name": "proxyStart", "type": "number", "description": "Started resolving proxy." },
                    { "name": "proxyEnd", "type": "number", "description": "Finished resolving proxy." },
                    { "name": "dnsStart", "type": "number", "description": "Started DNS address resolve." },
                    { "name": "dnsEnd", "type": "number", "description": "Finished DNS address resolve." },
                    { "name": "connectStart", "type": "number", "description": "Started connecting to the remote host." },
                    { "name": "connectEnd", "type": "number", "description": "Connected to the remote host." },
                    { "name": "sslStart", "type": "number", "description": "Started SSL handshake." },
                    { "name": "sslEnd", "type": "number", "description": "Finished SSL handshake." },
                    { "name": "serviceWorkerFetchStart", "type": "number", "description": "Started fetching via ServiceWorker.", "hidden": true },
                    { "name": "serviceWorkerFetchReady", "type": "number", "description": "Prepared a ServiceWorker.", "hidden": true },
                    { "name": "serviceWorkerFetchEnd", "type": "number", "description": "Finished fetching via ServiceWorker.", "hidden": true },
                    { "name": "sendStart", "type": "number", "description": "Started sending request." },
                    { "name": "sendEnd", "type": "number", "description": "Finished sending request." },
                    { "name": "receiveHeadersEnd", "type": "number", "description": "Finished receiving response headers." }
                ]
            },
            {
                "id": "Request",
                "type": "object",
                "description": "HTTP request data.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Request URL." },
                    { "name": "method", "type": "string", "description": "HTTP request method." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP request headers." },
                    { "name": "postData", "type": "string", "optional": true, "description": "HTTP POST request data." }
                ]
            },
            {
                "id": "Response",
                "type": "object",
                "description": "HTTP response data.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Response URL. This URL can be different from CachedResource.url in case of redirect." },
                    { "name": "status", "type": "number", "description": "HTTP response status code." },
                    { "name": "statusText", "type": "string", "description": "HTTP response status text." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP response headers." },
                    { "name": "headersText", "type": "string", "optional": true, "description": "HTTP response headers text." },
                    { "name": "mimeType", "type": "string", "description": "Resource mimeType as determined by the browser." },
                    { "name": "requestHeaders", "$ref": "Headers", "optional": true, "description": "Refined HTTP request headers that were actually transmitted over the network." },
                    { "name": "requestHeadersText", "type": "string", "optional": true, "description": "HTTP request headers text." },
                    { "name": "connectionReused", "type": "boolean", "description": "Specifies whether physical connection was actually reused for this request." },
                    { "name": "connectionId", "type": "number", "description": "Physical connection id that was actually used for this request." },
                    { "name": "remoteIPAddress", "type": "string", "optional": true, "hidden": true, "description": "Remote IP address." },
                    { "name": "remotePort", "type": "integer", "optional": true, "hidden": true, "description": "Remote port."},
                    { "name": "fromDiskCache", "type": "boolean", "optional": true, "description": "Specifies that the request was served from the disk cache." },
                    { "name": "fromServiceWorker", "type": "boolean", "optional": true, "description": "Specifies that the request was served from the ServiceWorker." },
                    { "name": "encodedDataLength", "type": "number", "optional": false, "description": "Total number of bytes received for this request so far." },
                    { "name": "timing", "$ref": "ResourceTiming", "optional": true, "description": "Timing information for the given request." },
                    { "name": "protocol", "type": "string", "optional": true, "description": "Protocol used to fetch this resquest." }
                ]
            },
            {
                "id": "WebSocketRequest",
                "type": "object",
                "description": "WebSocket request data.",
                "hidden": true,
                "properties": [
                    { "name": "headers", "$ref": "Headers", "description": "HTTP request headers." }
                ]
            },
            {
                "id": "WebSocketResponse",
                "type": "object",
                "description": "WebSocket response data.",
                "hidden": true,
                "properties": [
                    { "name": "status", "type": "number", "description": "HTTP response status code." },
                    { "name": "statusText", "type": "string", "description": "HTTP response status text." },
                    { "name": "headers", "$ref": "Headers", "description": "HTTP response headers." },
                    { "name": "headersText", "type": "string", "optional": true, "description": "HTTP response headers text." },
                    { "name": "requestHeaders", "$ref": "Headers", "optional": true, "description": "HTTP request headers." },
                    { "name": "requestHeadersText", "type": "string", "optional": true, "description": "HTTP request headers text." }
                ]
            },
            {
                "id": "WebSocketFrame",
                "type": "object",
                "description": "WebSocket frame data.",
                "hidden": true,
                "properties": [
                    { "name": "opcode", "type": "number", "description": "WebSocket frame opcode." },
                    { "name": "mask", "type": "boolean", "description": "WebSocke frame mask." },
                    { "name": "payloadData", "type": "string", "description": "WebSocke frame payload data." }
                ]
            },
            {
                "id": "CachedResource",
                "type": "object",
                "description": "Information about the cached resource.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Resource URL. This is the url of the original network request." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Type of this resource." },
                    { "name": "response", "$ref": "Response", "optional": true, "description": "Cached response data." },
                    { "name": "bodySize", "type": "number", "description": "Cached response body size." }
                ]
            },
            {
                "id": "Initiator",
                "type": "object",
                "description": "Information about the request initiator.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["parser", "script", "other"], "description": "Type of this initiator." },
                    { "name": "stackTrace", "$ref": "Console.StackTrace", "optional": true, "description": "Initiator JavaScript stack trace, set for Script only." },
                    { "name": "url", "type": "string", "optional": true, "description": "Initiator URL, set for Parser type only." },
                    { "name": "lineNumber", "type": "number", "optional": true, "description": "Initiator line number, set for Parser type only." },
                    { "name": "asyncStackTrace", "$ref": "Console.AsyncStackTrace", "optional": true, "description": "Initiator asynchronous JavaScript stack trace, if available.", "hidden": true }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables network tracking, network events will now be delivered to the client."
            },
            {
                "name": "disable",
                "description": "Disables network tracking, prevents network events from being sent to the client."
            },
            {
                "name": "setUserAgentOverride",
                "description": "Allows overriding user agent with the given string.",
                "parameters": [
                    { "name": "userAgent", "type": "string", "description": "User agent to use." }
                ]
            },
            {
                "name": "setExtraHTTPHeaders",
                "description": "Specifies whether to always send extra HTTP headers with the requests from this page.",
                "parameters": [
                    { "name": "headers", "$ref": "Headers", "description": "Map with extra HTTP headers." }
                ]
            },
            {
                "name": "getResponseBody",
                "async": true,
                "description": "Returns content served for the given request.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Identifier of the network request to get content for." }
                ],
                "returns": [
                    { "name": "body", "type": "string", "description": "Response body." },
                    { "name": "base64Encoded", "type": "boolean", "description": "True, if content was sent as base64." }
                ]
            },
            {
                "name": "replayXHR",
                "description": "This method sends a new XMLHttpRequest which is identical to the original one. The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Identifier of XHR to replay." }
                ],
                "hidden": true
            },
            {
                "name": "setMonitoringXHREnabled",
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "Monitoring enabled state." }
                ],
                "description": "Toggles monitoring of XMLHttpRequest. If <code>true</code>, console will receive messages upon each XHR issued.",
                "hidden": true
            },
            {
                "name": "canClearBrowserCache",
                "description": "Tells whether clearing browser cache is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if browser cache can be cleared." }
                ]
            },
            {
                "name": "clearBrowserCache",
                "description": "Clears browser cache.",
                "handlers": ["browser"]
            },
            {
                "name": "canClearBrowserCookies",
                "description": "Tells whether clearing browser cookies is supported.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if browser cookies can be cleared." }
                ]
            },
            {
                "name": "clearBrowserCookies",
                "description": "Clears browser cookies.",
                "handlers": ["browser"]
            },
            {
                "name": "canEmulateNetworkConditions",
                "description": "Tells whether emulation of network conditions is supported.",
                "returns": [
                  { "name": "result", "type": "boolean", "description": "True if emulation of network conditions is supported." }
                ],
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "emulateNetworkConditions",
                "description": "Activates emulation of network conditions.",
                "parameters": [
                    { "name": "offline", "type": "boolean", "description": "True to emulate internet disconnection." },
                    { "name": "latency", "type": "number", "description": "Additional latency (ms)." },
                    { "name": "downloadThroughput", "type": "number", "description": "Maximal aggregated download throughput." },
                    { "name": "uploadThroughput", "type": "number", "description": "Maximal aggregated upload throughput." }
                ],
                "hidden": true,
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "setCacheDisabled",
                "parameters": [
                    { "name": "cacheDisabled", "type": "boolean", "description": "Cache disabled state." }
                ],
                "description": "Toggles ignoring cache for each request. If <code>true</code>, cache will not be used."
            },
            {
                "name": "loadResourceForFrontend",
                "async": true,
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL of the resource to load." },
                    { "name": "requestHeaders", "$ref": "Network.Headers", "optional": true, "description": "Request headers." }
                ],
                "returns": [
                    { "name": "statusCode", "type": "number", "description": "HTTP status code." },
                    { "name": "responseHeaders", "$ref": "Network.Headers", "description": "Response headers." },
                    { "name": "content", "type": "string", "description": "Resource content." }
                ],
                "description": "Loads a resource in the context of a frame on the inspected page without cross origin checks.",
                "hidden": true
            },
            {
                "name": "setDataSizeLimitsForTest",
                "parameters": [
                    { "name": "maxTotalSize", "type": "integer", "description": "Maximum total buffer size." },
                    { "name": "maxResourceSize", "type": "integer", "description": "Maximum per-resource size." }
                ],
                "description": "For testing.",
                "hidden": true
            }
        ],
        "events": [
            {
                "name": "requestWillBeSent",
                "description": "Fired when page is about to send HTTP request.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Frame identifier.", "hidden": true },
                    { "name": "loaderId", "$ref": "LoaderId", "description": "Loader identifier." },
                    { "name": "documentURL", "type": "string", "description": "URL of the document this request is loaded for." },
                    { "name": "request", "$ref": "Request", "description": "Request data." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "initiator", "$ref": "Initiator", "description": "Request initiator." },
                    { "name": "redirectResponse", "optional": true, "$ref": "Response", "description": "Redirect response data." },
                    { "name": "type", "$ref": "Page.ResourceType", "optional": true, "hidden": true, "description": "Type of this resource." }
                ]
            },
            {
                "name": "requestServedFromCache",
                "description": "Fired if request ended up loading from cache.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." }
                ]
            },
            {
                "name": "responseReceived",
                "description": "Fired when HTTP response is available.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Frame identifier.", "hidden": true },
                    { "name": "loaderId", "$ref": "LoaderId", "description": "Loader identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Resource type." },
                    { "name": "response", "$ref": "Response", "description": "Response data." }
                ]
            },
            {
                "name": "dataReceived",
                "description": "Fired when data chunk was received over the network.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "dataLength", "type": "integer", "description": "Data chunk length." },
                    { "name": "encodedDataLength", "type": "integer", "description": "Actual bytes received (might be less than dataLength for compressed encodings)." }
                ]
            },
            {
                "name": "loadingFinished",
                "description": "Fired when HTTP request has finished loading.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "encodedDataLength", "type": "number", "description": "Total number of bytes received for this request." }
                ]
            },
            {
                "name": "loadingFailed",
                "description": "Fired when HTTP request has failed to load.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "type", "$ref": "Page.ResourceType", "description": "Resource type." },
                    { "name": "errorText", "type": "string", "description": "User friendly error message." },
                    { "name": "canceled", "type": "boolean", "optional": true, "description": "True if loading was canceled." }
                ]
            },
            {
                "name": "webSocketWillSendHandshakeRequest",
                "description": "Fired when WebSocket is about to initiate handshake.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "request", "$ref": "WebSocketRequest", "description": "WebSocket request data." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketHandshakeResponseReceived",
                "description": "Fired when WebSocket handshake response becomes available.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketResponse", "description": "WebSocket response data." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketCreated",
                "description": "Fired upon WebSocket creation.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "url", "type": "string", "description": "WebSocket request URL." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketClosed",
                "description": "Fired when WebSocket is closed.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketFrameReceived",
                "description": "Fired when WebSocket frame is received.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketFrame", "description": "WebSocket response data." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketFrameError",
                "description": "Fired when WebSocket frame error occurs.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "errorMessage", "type": "string", "description": "WebSocket frame error message." }
                ],
                "hidden": true
            },
            {
                "name": "webSocketFrameSent",
                "description": "Fired when WebSocket frame is sent.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "response", "$ref": "WebSocketFrame", "description": "WebSocket response data." }
                ],
                "hidden": true
            },
            {
                "name": "eventSourceMessageReceived",
                "description": "Fired when EventSource message is received.",
                "parameters": [
                    { "name": "requestId", "$ref": "RequestId", "description": "Request identifier." },
                    { "name": "timestamp", "$ref": "Timestamp", "description": "Timestamp." },
                    { "name": "eventName", "type": "string", "description": "Message type." },
                    { "name": "eventId", "type": "string", "description": "Message identifier." },
                    { "name": "data", "type": "string", "description": "Message content." }
                ],
                "hidden": true
            }
        ]
    },
    {
        "domain": "Database",
        "hidden": true,
        "types": [
            {
                "id": "DatabaseId",
                "type": "string",
                "description": "Unique identifier of Database object.",
                "hidden": true
            },
            {
                "id": "Database",
                "type": "object",
                "description": "Database object.",
                "hidden": true,
                "properties": [
                    { "name": "id", "$ref": "DatabaseId", "description": "Database ID." },
                    { "name": "domain", "type": "string", "description": "Database domain." },
                    { "name": "name", "type": "string", "description": "Database name." },
                    { "name": "version", "type": "string", "description": "Database version." }
                ]
            },
            {
                "id": "Error",
                "type": "object",
                "description": "Database error.",
                "properties": [
                    { "name": "message", "type": "string", "description": "Error message." },
                    { "name": "code", "type": "integer", "description": "Error code." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables database tracking, database events will now be delivered to the client."
            },
            {
                "name": "disable",
                "description": "Disables database tracking, prevents database events from being sent to the client."
            },
            {
                "name": "getDatabaseTableNames",
                "parameters": [
                    { "name": "databaseId", "$ref": "DatabaseId" }
                ],
                "returns": [
                    { "name": "tableNames", "type": "array", "items": { "type": "string" } }
                ]
            },
            {
                "name": "executeSQL",
                "async": true,
                "parameters": [
                    { "name": "databaseId", "$ref": "DatabaseId" },
                    { "name": "query", "type": "string" }
                ],
                "returns": [
                    { "name": "columnNames", "type": "array", "optional": true, "items": { "type": "string" } },
                    { "name": "values", "type": "array", "optional": true, "items": { "type": "any" }},
                    { "name": "sqlError", "$ref": "Error", "optional": true }
                ]
            }
        ],
        "events": [
            {
                "name": "addDatabase",
                "parameters": [
                    { "name": "database", "$ref": "Database" }
                ]
            }
        ]
    },
    {
        "domain": "IndexedDB",
        "hidden": true,
        "types": [
            {
                "id": "DatabaseWithObjectStores",
                "type": "object",
                "description": "Database with an array of object stores.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Database name." },
                    { "name": "version", "type": "string", "description": "Deprecated string database version." },
                    { "name": "intVersion", "type": "integer", "description": "Integer database version." },
                    { "name": "objectStores", "type": "array", "items": { "$ref": "ObjectStore" }, "description": "Object stores in this database." }
                ]
            },
            {
                "id": "ObjectStore",
                "type": "object",
                "description": "Object store.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Object store name." },
                    { "name": "keyPath", "$ref": "KeyPath", "description": "Object store key path." },
                    { "name": "autoIncrement", "type": "boolean", "description": "If true, object store has auto increment flag set." },
                    { "name": "indexes", "type": "array", "items": { "$ref": "ObjectStoreIndex" }, "description": "Indexes in this object store." }
                ]
            },
            {
                "id": "ObjectStoreIndex",
                "type": "object",
                "description": "Object store index.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Index name." },
                    { "name": "keyPath", "$ref": "KeyPath", "description": "Index key path." },
                    { "name": "unique", "type": "boolean", "description": "If true, index is unique." },
                    { "name": "multiEntry", "type": "boolean", "description": "If true, index allows multiple entries for a key." }
                ]
            },
            {
                "id": "Key",
                "type": "object",
                "description": "Key.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["number", "string", "date", "array"], "description": "Key type." },
                    { "name": "number", "type": "number", "optional": true, "description": "Number value." },
                    { "name": "string", "type": "string", "optional": true, "description": "String value." },
                    { "name": "date", "type": "number", "optional": true, "description": "Date value." },
                    { "name": "array", "type": "array", "optional": true, "items": { "$ref": "Key" }, "description": "Array value." }
                ]
            },
            {
                "id": "KeyRange",
                "type": "object",
                "description": "Key range.",
                "properties": [
                    { "name": "lower", "$ref": "Key", "optional": true, "description": "Lower bound." },
                    { "name": "upper", "$ref": "Key", "optional": true, "description": "Upper bound." },
                    { "name": "lowerOpen", "type": "boolean", "description": "If true lower bound is open." },
                    { "name": "upperOpen", "type": "boolean", "description": "If true upper bound is open." }
                ]
            },
            {
                "id": "DataEntry",
                "type": "object",
                "description": "Data entry.",
                "properties": [
                    { "name": "key", "type": "string", "description": "JSON-stringified key object." },
                    { "name": "primaryKey", "type": "string", "description": "JSON-stringified primary key object." },
                    { "name": "value", "type": "string", "description": "JSON-stringified value object." }
                ]
            },
            {
                "id": "KeyPath",
                "type": "object",
                "description": "Key path.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["null", "string", "array"], "description": "Key path type." },
                    { "name": "string", "type": "string", "optional": true, "description": "String value." },
                    { "name": "array", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Array value." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables events from backend."
            },
            {
                "name": "disable",
                "description": "Disables events from backend."
            },
            {
                "name": "requestDatabaseNames",
                "async": true,
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." }
                ],
                "returns": [
                    { "name": "databaseNames", "type": "array", "items": { "type": "string" }, "description": "Database names for origin." }
                ],
                "description": "Requests database names for given security origin."
            },
            {
                "name": "requestDatabase",
                "async": true,
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." }
                ],
                "returns": [
                    { "name": "databaseWithObjectStores", "$ref": "DatabaseWithObjectStores", "description": "Database with an array of object stores." }
                ],
                "description": "Requests database with given name in given frame."
            },
            {
                "name": "requestData",
                "async": true,
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." },
                    { "name": "objectStoreName", "type": "string", "description": "Object store name." },
                    { "name": "indexName", "type": "string", "description": "Index name, empty string for object store data requests." },
                    { "name": "skipCount", "type": "integer", "description": "Number of records to skip." },
                    { "name": "pageSize", "type": "integer", "description": "Number of records to fetch." },
                    { "name": "keyRange", "$ref": "KeyRange", "optional": true, "description": "Key range." }
                ],
                "returns": [
                    { "name": "objectStoreDataEntries", "type": "array", "items": { "$ref": "DataEntry" }, "description": "Array of object store data entries." },
                    { "name": "hasMore", "type": "boolean", "description": "If true, there are more entries to fetch in the given range." }
                ],
                "description": "Requests data from object store or index."
            },
            {
                "name": "clearObjectStore",
                "async": true,
                "parameters": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin." },
                    { "name": "databaseName", "type": "string", "description": "Database name." },
                    { "name": "objectStoreName", "type": "string", "description": "Object store name." }
                ],
                "returns": [
                ],
                "description": "Clears all entries from an object store."
            }
        ]
    },
    {
        "domain": "ServiceWorkerCache",
        "hidden": true,
        "types": [
            {
                "id": "DataEntry",
                "type": "object",
                "description": "Data entry.",
                "properties": [
                    { "name": "request", "type": "string", "description": "JSON-stringified request object." },
                    { "name": "response", "type": "string", "description": "JSON-stringified response object." }
                ]
            }
        ],
        "commands": [
            {
                "name": "requestCacheNames",
                "async": true,
                "returns": [
                    { "name": "cacheNames", "type": "array", "items": { "type": "string" }, "description": "Cache names for origin." }
                ],
                "description": "Requests cache names."
            },
            {
                "name": "requestEntries",
                "async": true,
                "parameters": [
                    { "name": "cacheName", "type": "string", "description": "Cache name." },
                    { "name": "skipCount", "type": "integer", "description": "Number of records to skip." },
                    { "name": "pageSize", "type": "integer", "description": "Number of records to fetch." }
                ],
                "returns": [
                    { "name": "cacheDataEntries", "type": "array", "items": { "$ref": "DataEntry" }, "description": "Array of object store data entries." },
                    { "name": "hasMore", "type": "boolean", "description": "If true, there are more entries to fetch in the given range." }
                ],
                "description": "Requests data from cache."
            },
            {
                "name": "deleteCache",
                "async": true,
                "parameters": [
                    { "name": "cacheName", "type": "string", "description": "Cache name." }
                ],
                "description": "Deletes a cache."
            }
        ]
    },
    {
        "domain": "DOMStorage",
        "hidden": true,
        "description": "Query and modify DOM storage.",
        "types": [
            {
                "id": "StorageId",
                "type": "object",
                "description": "DOM Storage identifier.",
                "hidden": true,
                "properties": [
                    { "name": "securityOrigin", "type": "string", "description": "Security origin for the storage." },
                    { "name": "isLocalStorage", "type": "boolean", "description": "Whether the storage is local storage (not session storage)." }
                ]
            },
            {
                "id": "Item",
                "type": "array",
                "description": "DOM Storage item.",
                "hidden": true,
                "items": { "type": "string" }
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables storage tracking, storage events will now be delivered to the client."
            },
            {
                "name": "disable",
                "description": "Disables storage tracking, prevents storage events from being sent to the client."
            },
            {
                "name": "getDOMStorageItems",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" }
                ],
                "returns": [
                    { "name": "entries", "type": "array", "items": { "$ref": "Item" } }
                ]
            },
            {
                "name": "setDOMStorageItem",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "value", "type": "string" }
                ]
            },
            {
                "name": "removeDOMStorageItem",
                "parameters": [
                    { "name": "storageId", "$ref": "StorageId" },
                    { "name": "key", "type": "string" }
                ]
            }
        ],
        "events": [
            {
                "name": "domStorageItemsCleared",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" }
                ]
            },
            {
                "name": "domStorageItemRemoved",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" }
                ]
            },
            {
                "name": "domStorageItemAdded",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "newValue", "type": "string" }
                ]
            },
            {
                "name": "domStorageItemUpdated",
                "parameters": [
                    { "name": "storageId",  "$ref": "StorageId" },
                    { "name": "key", "type": "string" },
                    { "name": "oldValue", "type": "string" },
                    { "name": "newValue", "type": "string" }
                ]
            }
        ]
    },
    {
        "domain": "ApplicationCache",
        "hidden": true,
        "types": [
            {
                "id": "ApplicationCacheResource",
                "type": "object",
                "description": "Detailed application cache resource information.",
                "properties": [
                    { "name": "url", "type": "string", "description": "Resource url." },
                    { "name": "size", "type": "integer", "description": "Resource size." },
                    { "name": "type", "type": "string", "description": "Resource type." }
                ]
            },
            {
                "id": "ApplicationCache",
                "type": "object",
                "description": "Detailed application cache information.",
                "properties": [
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "size", "type": "number", "description": "Application cache size." },
                    { "name": "creationTime", "type": "number", "description": "Application cache creation time." },
                    { "name": "updateTime", "type": "number", "description": "Application cache update time." },
                    { "name": "resources", "type": "array", "items": { "$ref": "ApplicationCacheResource" }, "description": "Application cache resources." }
                ]
            },
            {
                "id": "FrameWithManifest",
                "type": "object",
                "description": "Frame identifier - manifest URL pair.",
                "properties": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Frame identifier." },
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "status", "type": "integer", "description": "Application cache status." }
                ]
            }
        ],
        "commands": [
            {
                "name": "getFramesWithManifests",
                "returns": [
                    { "name": "frameIds", "type": "array", "items": { "$ref": "FrameWithManifest" }, "description": "Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache." }
                ],
                "description": "Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache."
            },
            {
                "name": "enable",
                "description": "Enables application cache domain notifications."
            },
            {
                "name": "getManifestForFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose manifest is retrieved." }
                ],
                "returns": [
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL for document in the given frame." }
                ],
                "description": "Returns manifest URL for document in the given frame."
            },
            {
                "name": "getApplicationCacheForFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose application cache is retrieved." }
                ],
                "returns": [
                    { "name": "applicationCache", "$ref": "ApplicationCache", "description": "Relevant application cache data for the document in given frame." }
                ],
                "description": "Returns relevant application cache data for the document in given frame."
            }
        ],
        "events": [
            {
                "name": "applicationCacheStatusUpdated",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing document whose application cache updated status." },
                    { "name": "manifestURL", "type": "string", "description": "Manifest URL." },
                    { "name": "status", "type": "integer", "description": "Updated application cache status." }
                ]
            },
            {
                "name": "networkStateUpdated",
                "parameters": [
                    { "name": "isNowOnline", "type": "boolean" }
                ]
            }
        ]
    },
    {
        "domain": "FileSystem",
        "hidden": true,
        "types": [
            {
                "id": "Entry",
                "type": "object",
                "properties": [
                    { "name": "url", "type": "string", "description": "filesystem: URL for the entry." },
                    { "name": "name", "type": "string", "description": "The name of the file or directory." },
                    { "name": "isDirectory", "type": "boolean", "description": "True if the entry is a directory." },
                    { "name": "mimeType", "type": "string", "optional": true, "description": "MIME type of the entry, available for a file only." },
                    { "name": "resourceType", "$ref": "Page.ResourceType", "optional": true, "description": "ResourceType of the entry, available for a file only." },
                    { "name": "isTextFile", "type": "boolean", "optional": true, "description": "True if the entry is a text file." }
                ],
                "description": "Represents a browser side file or directory."
            },
            {
                "id": "Metadata",
                "type": "object",
                "properties": [
                    { "name": "modificationTime", "type": "number", "description": "Modification time." },
                    { "name": "size", "type": "number", "description": "File size. This field is always zero for directories." }
                ],
                "description": "Represents metadata of a file or entry."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables events from backend."
            },
            {
                "name": "disable",
                "description": "Disables events from backend."
            },
            {
                "name": "requestFileSystemRoot",
                "async": true,
                "parameters": [
                    { "name": "origin", "type": "string", "description": "Security origin of requesting FileSystem. One of frames in current page needs to have this security origin." },
                    { "name": "type", "type": "string", "enum": ["temporary", "persistent"], "description": "FileSystem type of requesting FileSystem." }
                ],
                "returns": [
                    { "name": "errorCode", "type": "integer", "description": "0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value." },
                    { "name": "root", "$ref": "Entry", "optional": true, "description": "Contains root of the requested FileSystem if the command completed successfully." }
                ],
                "description": "Returns root directory of the FileSystem, if exists."
            },
            {
                "name": "requestDirectoryContent",
                "async": true,
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL of the directory that the frontend is requesting to read from." }
                ],
                "returns": [
                    { "name": "errorCode", "type": "integer", "description": "0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value." },
                    { "name": "entries", "type": "array", "items": { "$ref": "Entry" }, "optional": true, "description": "Contains all entries on directory if the command completed successfully." }
                ],
                "description": "Returns content of the directory."
            },
            {
                "name": "requestMetadata",
                "async": true,
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL of the entry that the frontend is requesting to get metadata from." }
                ],
                "returns": [
                    { "name": "errorCode", "type": "integer", "description": "0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value." },
                    { "name": "metadata", "$ref": "Metadata", "optional": true, "description": "Contains metadata of the entry if the command completed successfully." }
                ],
                "description": "Returns metadata of the entry."
            },
            {
                "name": "requestFileContent",
                "async": true,
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL of the file that the frontend is requesting to read from." },
                    { "name": "readAsText", "type": "boolean", "description": "True if the content should be read as text, otherwise the result will be returned as base64 encoded text." },
                    { "name": "start", "type": "integer", "optional": true, "description": "Specifies the start of range to read." },
                    { "name": "end", "type": "integer", "optional": true, "description": "Specifies the end of range to read exclusively." },
                    { "name": "charset", "type": "string", "optional": true, "description": "Overrides charset of the content when content is served as text." }
                ],
                "returns": [
                    { "name": "errorCode", "type": "integer", "description": "0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value." },
                    { "name": "content", "type": "string", "optional": true, "description": "Content of the file." },
                    { "name": "charset", "type": "string", "optional": true, "description": "Charset of the content if it is served as text." }
                ],
                "description": "Returns content of the file. Result should be sliced into [start, end)."
            },
            {
                "name": "deleteEntry",
                "async": true,
                "parameters": [
                    { "name": "url", "type": "string", "description": "URL of the entry to delete." }
                ],
                "returns": [
                    { "name": "errorCode", "type": "integer", "description": "0, if no error. Otherwise errorCode is set to FileError::ErrorCode value." }
                ],
                "description": "Deletes specified entry. If the entry is a directory, the agent deletes children recursively."
            }
        ]
    },
    {
        "domain": "DOM",
        "description": "This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object that has an <code>id</code>. This <code>id</code> can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc. It is important that client receives DOM events only for the nodes that are known to the client. Backend keeps track of the nodes that were sent to the client and never sends the same node twice. It is client's responsibility to collect information about the nodes that were sent to the client.<p>Note that <code>iframe</code> owner elements will return corresponding document elements as their child nodes.</p>",
        "types": [
            {
                "id": "NodeId",
                "type": "integer",
                "description": "Unique DOM node identifier."
            },
            {
                "id": "BackendNodeId",
                "type": "integer",
                "description": "Unique DOM node identifier used to reference a node that may not have been pushed to the front-end.",
                "hidden": true
            },
            {
                "id": "PseudoType",
                "type": "string",
                "enum": [
                    "first-line",
                    "first-letter",
                    "before",
                    "after",
                    "backdrop",
                    "selection",
                    "first-line-inherited",
                    "scrollbar",
                    "scrollbar-thumb",
                    "scrollbar-button",
                    "scrollbar-track",
                    "scrollbar-track-piece",
                    "scrollbar-corner",
                    "resizer",
                    "input-list-button"
                ],
                "description": "Pseudo element type."
            },
            {
                "id": "ShadowRootType",
                "type": "string",
                "enum": ["user-agent", "author"],
                "description": "Shadow root type."
            },
            {
                "id": "Node",
                "type": "object",
                "properties": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client." },
                    { "name": "nodeType", "type": "integer", "description": "<code>Node</code>'s nodeType." },
                    { "name": "nodeName", "type": "string", "description": "<code>Node</code>'s nodeName." },
                    { "name": "localName", "type": "string", "description": "<code>Node</code>'s localName." },
                    { "name": "nodeValue", "type": "string", "description": "<code>Node</code>'s nodeValue." },
                    { "name": "childNodeCount", "type": "integer", "optional": true, "description": "Child count for <code>Container</code> nodes." },
                    { "name": "children", "type": "array", "optional": true, "items": { "$ref": "Node" }, "description": "Child nodes of this node when requested with children." },
                    { "name": "attributes", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>." },
                    { "name": "documentURL", "type": "string", "optional": true, "description": "Document URL that <code>Document</code> or <code>FrameOwner</code> node points to." },
                    { "name": "baseURL", "type": "string", "optional": true, "description": "Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion.", "hidden": true },
                    { "name": "publicId", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s publicId." },
                    { "name": "systemId", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s systemId." },
                    { "name": "internalSubset", "type": "string", "optional": true, "description": "<code>DocumentType</code>'s internalSubset." },
                    { "name": "xmlVersion", "type": "string", "optional": true, "description": "<code>Document</code>'s XML version in case of XML documents." },
                    { "name": "name", "type": "string", "optional": true, "description": "<code>Attr</code>'s name." },
                    { "name": "value", "type": "string", "optional": true, "description": "<code>Attr</code>'s value." },
                    { "name": "pseudoType", "$ref": "PseudoType", "optional": true, "description": "Pseudo element type for this node." },
                    { "name": "shadowRootType", "$ref": "ShadowRootType", "optional": true, "description": "Shadow root type." },
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "Frame ID for frame owner elements.", "hidden": true },
                    { "name": "contentDocument", "$ref": "Node", "optional": true, "description": "Content document for frame owner elements." },
                    { "name": "shadowRoots", "type": "array", "optional": true, "items": { "$ref": "Node" }, "description": "Shadow root list for given element host.", "hidden": true },
                    { "name": "templateContent", "$ref": "Node", "optional": true, "description": "Content document fragment for template elements.", "hidden": true },
                    { "name": "pseudoElements", "type": "array", "items": { "$ref": "Node" }, "optional": true, "description": "Pseudo elements associated with this node.", "hidden": true },
                    { "name": "importedDocument", "$ref": "Node", "optional": true, "description": "Import document for the HTMLImport links." }
                ],
                "description": "DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type."
            },
            {
                "id": "EventListener",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "type", "type": "string", "description": "<code>EventListener</code>'s type." },
                    { "name": "useCapture", "type": "boolean", "description": "<code>EventListener</code>'s useCapture." },
                    { "name": "isAttribute", "type": "boolean", "description": "<code>EventListener</code>'s isAttribute." },
                    { "name": "nodeId", "$ref": "NodeId", "description": "Target <code>DOMNode</code> id." },
                    { "name": "location", "$ref": "Debugger.Location", "description": "Handler code location." },
                    { "name": "handler", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Event handler function value." }
                ],
                "description": "DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type."
            },
            {
                "id": "RGBA",
                "type": "object",
                "properties": [
                    { "name": "r", "type": "integer", "description": "The red component, in the [0-255] range." },
                    { "name": "g", "type": "integer", "description": "The green component, in the [0-255] range." },
                    { "name": "b", "type": "integer", "description": "The blue component, in the [0-255] range." },
                    { "name": "a", "type": "number", "optional": true, "description": "The alpha component, in the [0-1] range (default: 1)." }
                ],
                "description": "A structure holding an RGBA color."
            },
            {
                "id": "Quad",
                "type": "array",
                "items": { "type": "number" },
                "minItems": 8,
                "maxItems": 8,
                "description": "An array of quad vertices, x immediately followed by y for each point, points clock-wise.",
                "hidden": true
            },
            {
                "id": "BoxModel",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "content", "$ref": "Quad", "description": "Content box" },
                    { "name": "padding", "$ref": "Quad", "description": "Padding box" },
                    { "name": "border", "$ref": "Quad", "description": "Border box" },
                    { "name": "margin", "$ref": "Quad", "description": "Margin box" },
                    { "name": "width", "type": "integer", "description": "Node width" },
                    { "name": "height", "type": "integer", "description": "Node height" },
                    { "name": "shapeOutside", "$ref": "ShapeOutsideInfo", "optional": true, "description": "Shape outside coordinates" }
                ],
                "description": "Box model."
            },
            {
                "id": "ShapeOutsideInfo",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "bounds", "$ref": "Quad", "description": "Shape bounds" },
                    { "name": "shape", "type": "array", "items": { "type": "any"}, "description": "Shape coordinate details" },
                    { "name": "marginShape", "type": "array", "items": { "type": "any"}, "description": "Margin shape bounds" }
                ],
                "description": "CSS Shape Outside details."
            },
            {
                "id": "Rect",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "x", "type": "number", "description": "X coordinate" },
                    { "name": "y", "type": "number", "description": "Y coordinate" },
                    { "name": "width", "type": "number", "description": "Rectangle width" },
                    { "name": "height", "type": "number", "description": "Rectangle height" }
                ],
                "description": "Rectangle."
            },
            {
                "id": "HighlightConfig",
                "type": "object",
                "properties": [
                    { "name": "showInfo", "type": "boolean", "optional": true, "description": "Whether the node info tooltip should be shown (default: false)." },
                    { "name": "showRulers", "type": "boolean", "optional": true, "description": "Whether the rulers should be shown (default: false)." },
                    { "name": "showExtensionLines", "type": "boolean", "optional": true, "description": "Whether the extension lines from node to the rulers should be shown (default: false)." },
                    { "name": "contentColor", "$ref": "RGBA", "optional": true, "description": "The content box highlight fill color (default: transparent)." },
                    { "name": "paddingColor", "$ref": "RGBA", "optional": true, "description": "The padding highlight fill color (default: transparent)." },
                    { "name": "borderColor", "$ref": "RGBA", "optional": true, "description": "The border highlight fill color (default: transparent)." },
                    { "name": "marginColor", "$ref": "RGBA", "optional": true, "description": "The margin highlight fill color (default: transparent)." },
                    { "name": "eventTargetColor", "$ref": "RGBA", "optional": true, "hidden": true, "description": "The event target element highlight fill color (default: transparent)." },
                    { "name": "shapeColor", "$ref": "RGBA", "optional": true, "hidden": true, "description": "The shape outside fill color (default: transparent)." },
                    { "name": "shapeMarginColor", "$ref": "RGBA", "optional": true, "hidden": true, "description": "The shape margin fill color (default: transparent)." }
                ],
                "description": "Configuration data for the highlighting of page elements."
            },
            {
                "id": "DistributedNode",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Distributed node id." },
                    { "name": "destinationInsertionPointIds", "type": "array", "optional": true, "items": { "$ref": "NodeId" }, "description": "Identifiers of nodes this node was distributed into." }
                ],
                "description": "Distributed node detailed information."
            },
            {
                "id": "InsertionPointDistribution",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Insertion point node id." },
                    { "name": "distributedNodes", "type": "array", "items": { "$ref": "DistributedNode" }, "description": "A list of distributed node details for this insertion point." }
                ],
                "description": "Distribution data for insertion point."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables DOM agent for the given page."
            },
            {
                "name": "disable",
                "description": "Disables DOM agent for the given page."
            },
            {
                "name": "getDocument",
                "returns": [
                    { "name": "root", "$ref": "Node", "description": "Resulting node." }
                ],
                "description": "Returns the root DOM node to the caller."
            },
            {
                "name": "requestChildNodes",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get children for." },
                    { "name": "depth", "type": "integer", "optional": true, "description": "The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.", "hidden": true }
                ],
                "description": "Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth."
            },
            {
                "name": "requestShadowHostDistributedNodes",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get distributed nodes for." }
                ],
                "returns": [
                    { "name": "insertionPointDistributions", "type": "array", "items": { "$ref": "InsertionPointDistribution" }, "description": "A list of distribution data for each insertion point in shadow host." }
                ],
                "description": "Returns distribution data for all insertion points in shadow tree of the given node."
            },
            {
                "name": "querySelector",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to query upon." },
                    { "name": "selector", "type": "string", "description": "Selector string." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Query selector result." }
                ],
                "description": "Executes <code>querySelector</code> on a given node."
            },
            {
                "name": "querySelectorAll",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to query upon." },
                    { "name": "selector", "type": "string", "description": "Selector string." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Query selector result." }
                ],
                "description": "Executes <code>querySelectorAll</code> on a given node."
            },
            {
                "name": "setNodeName",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set name for." },
                    { "name": "name", "type": "string", "description": "New node's name." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "New node's id." }
                ],
                "description": "Sets node name for a node with given id."
            },
            {
                "name": "setNodeValue",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set value for." },
                    { "name": "value", "type": "string", "description": "New node's value." }
                ],
                "description": "Sets node value for a node with given id."
            },
            {
                "name": "removeNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to remove." }
                ],
                "description": "Removes node with given id."
            },
            {
                "name": "setAttributeValue",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to set attribute for." },
                    { "name": "name", "type": "string", "description": "Attribute name." },
                    { "name": "value", "type": "string", "description": "Attribute value." }
                ],
                "description": "Sets attribute for an element with given id."
            },
            {
                "name": "setAttributesAsText",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to set attributes for." },
                    { "name": "text", "type": "string", "description": "Text with a number of attributes. Will parse this text using HTML parser." },
                    { "name": "name", "type": "string", "optional": true, "description": "Attribute name to replace with new attributes derived from text in case text parsed successfully." }
                ],
                "description": "Sets attributes on element with given id. This method is useful when user edits some existing attribute value and types in several attribute name/value pairs."
            },
            {
                "name": "removeAttribute",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the element to remove attribute from." },
                    { "name": "name", "type": "string", "description": "Name of the attribute to remove." }
                ],
                "description": "Removes attribute with given name from an element with given id."
            },
            {
                "name": "getEventListenersForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get listeners for." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name for handler value. Handler value is not returned without this parameter specified." }
                ],
                "returns": [
                    { "name": "listeners", "type": "array", "items": { "$ref": "EventListener" }, "description": "Array of relevant listeners." }
                ],
                "description": "Returns event listeners relevant to the node.",
                "hidden": true
            },
            {
                "name": "getOuterHTML",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get markup for." }
                ],
                "returns": [
                    { "name": "outerHTML", "type": "string", "description": "Outer HTML markup." }
                ],
                "description": "Returns node's HTML markup."
            },
            {
                "name": "setOuterHTML",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to set markup for." },
                    { "name": "outerHTML", "type": "string", "description": "Outer HTML markup to set." }
                ],
                "description": "Sets node HTML markup, returns new node id."
            },
            {
                "name": "performSearch",
                "parameters": [
                    { "name": "query", "type": "string", "description": "Plain text or query selector or XPath search query." },
                    { "name": "includeUserAgentShadowDOM", "type": "boolean", "optional": true, "description": "True to search in user agent shadow DOM.", "hidden": true }
                ],
                "returns": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." },
                    { "name": "resultCount", "type": "integer", "description": "Number of search results." }
                ],
                "description": "Searches for a given string in the DOM tree. Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.",
                "hidden": true
            },
            {
                "name": "getSearchResults",
                "parameters": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." },
                    { "name": "fromIndex", "type": "integer", "description": "Start index of the search result to be returned." },
                    { "name": "toIndex", "type": "integer", "description": "End index of the search result to be returned." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Ids of the search result nodes." }
                ],
                "description": "Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.",
                "hidden": true
            },
            {
                "name": "discardSearchResults",
                "parameters": [
                    { "name": "searchId", "type": "string", "description": "Unique search session identifier." }
                ],
                "description": "Discards search results from the session with the given id. <code>getSearchResults</code> should no longer be called for that search.",
                "hidden": true
            },
            {
                "name": "requestNode",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "JavaScript object id to convert into node." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Node id for given object." }
                ],
                "description": "Requests that the node is sent to the caller given the JavaScript node object reference. All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications."
            },
            {
                "name": "setInspectModeEnabled",
                "hidden": true,
                "parameters": [
                    { "name": "enabled", "type": "boolean", "description": "True to enable inspection mode, false to disable it." },
                    { "name": "inspectUAShadowDOM", "type": "boolean", "optional": true, "description": "True to enable inspection mode for user agent shadow DOM." },
                    { "name": "highlightConfig", "$ref": "HighlightConfig", "optional": true, "description": "A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>." }
                ],
                "description": "Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted. Backend then generates 'inspectNodeRequested' event upon element selection."
            },
            {
                "name": "highlightRect",
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate" },
                    { "name": "y", "type": "integer", "description": "Y coordinate" },
                    { "name": "width", "type": "integer", "description": "Rectangle width" },
                    { "name": "height", "type": "integer", "description": "Rectangle height" },
                    { "name": "color", "$ref": "RGBA", "optional": true, "description": "The highlight fill color (default: transparent)." },
                    { "name": "outlineColor", "$ref": "RGBA", "optional": true, "description": "The highlight outline color (default: transparent)." }
                ],
                "description": "Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport."
            },
            {
                "name": "highlightQuad",
                "parameters": [
                    { "name": "quad", "$ref": "Quad", "description": "Quad to highlight" },
                    { "name": "color", "$ref": "RGBA", "optional": true, "description": "The highlight fill color (default: transparent)." },
                    { "name": "outlineColor", "$ref": "RGBA", "optional": true, "description": "The highlight outline color (default: transparent)." }
                ],
                "description": "Highlights given quad. Coordinates are absolute with respect to the main frame viewport.",
                "hidden": true
            },
            {
                "name": "highlightNode",
                "parameters": [
                    { "name": "highlightConfig", "$ref": "HighlightConfig",  "description": "A descriptor for the highlight appearance." },
                    { "name": "nodeId", "$ref": "NodeId", "optional": true, "description": "Identifier of the node to highlight." },
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "JavaScript object id of the node to be highlighted.", "hidden": true }
                ],
                "description": "Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified."
            },
            {
                "name": "hideHighlight",
                "description": "Hides DOM node highlight."
            },
            {
                "name": "highlightFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame to highlight." },
                    { "name": "contentColor", "$ref": "RGBA", "optional": true, "description": "The content box highlight fill color (default: transparent)." },
                    { "name": "contentOutlineColor", "$ref": "RGBA", "optional": true, "description": "The content box highlight outline color (default: transparent)." }
                ],
                "description": "Highlights owner element of the frame with given id.",
                "hidden": true
            },
            {
                "name": "pushNodeByPathToFrontend",
                "parameters": [
                    { "name": "path", "type": "string", "description": "Path to node in the proprietary format." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node for given path." }
                ],
                "description": "Requests that the node is sent to the caller given its path. // FIXME, use XPath",
                "hidden": true
            },
            {
                "name": "pushNodesByBackendIdsToFrontend",
                "parameters": [
                    { "name": "backendNodeIds", "type": "array", "items": {"$ref": "BackendNodeId"}, "description": "The array of backend node ids." }
                ],
                "returns": [
                    { "name": "nodeIds", "type": "array", "items": {"$ref": "NodeId"}, "description": "The array of ids of pushed nodes that correspond to the backend ids specified in backendNodeIds." }
                ],
                "description": "Requests that a batch of nodes is sent to the caller given their backend node ids.",
                "hidden": true
            },
            {
                "name": "setInspectedNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "DOM node id to be accessible by means of $x command line API." }
                ],
                "description": "Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).",
                "hidden": true
            },
            {
                "name": "resolveNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to resolve." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." }
                ],
                "returns": [
                    { "name": "object", "$ref": "Runtime.RemoteObject", "description": "JavaScript object wrapper for given node." }
                ],
                "description": "Resolves JavaScript node object for given node id."
            },
            {
                "name": "getAttributes",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to retrieve attibutes for." }
                ],
                "returns": [
                    { "name": "attributes", "type": "array", "items": { "type": "string" }, "description": "An interleaved array of node attribute names and values." }
                ],
                "description": "Returns attributes for the specified node."
            },
            {
                "name": "copyTo",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to copy." },
                    { "name": "targetNodeId", "$ref": "NodeId", "description": "Id of the element to drop the copy into." },
                    { "name": "insertBeforeNodeId", "$ref": "NodeId", "optional": true, "description": "Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>)." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node clone." }
                ],
                "description": "Creates a deep copy of the specified node and places it into the target container before the given anchor.",
                "hidden": true
            },
            {
                "name": "moveTo",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to move." },
                    { "name": "targetNodeId", "$ref": "NodeId", "description": "Id of the element to drop the moved node into." },
                    { "name": "insertBeforeNodeId", "$ref": "NodeId", "optional": true, "description": "Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>)." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "New id of the moved node." }
                ],
                "description": "Moves node into the new container, places it before the given anchor."
            },
            {
                "name": "undo",
                "description": "Undoes the last performed action.",
                "hidden": true
            },
            {
                "name": "redo",
                "description": "Re-does the last undone action.",
                "hidden": true
            },
            {
                "name": "markUndoableState",
                "description": "Marks last undoable state.",
                "hidden": true
            },
            {
                "name": "focus",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to focus." }
                ],
                "description": "Focuses the given element.",
                "hidden": true
            },
            {
                "name": "setFileInputFiles",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the file input node to set files for." },
                    { "name": "files", "type": "array", "items": { "type": "string" }, "description": "Array of file paths to set." }
                ],
                "description": "Sets files for the given file input element.",
                "hidden": true,
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "getBoxModel",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get box model for." }
                ],
                "returns": [
                    { "name": "model", "$ref": "BoxModel", "description": "Box model for the node." }
                ],
                "description": "Returns boxes for the currently selected nodes.",
                "hidden": true
            },
            {
                "name": "getNodeForLocation",
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate." },
                    { "name": "y", "type": "integer", "description": "Y coordinate." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node at given coordinates." }
                ],
                "description": "Returns node id at given location.",
                "hidden": true
            },
            {
                "name": "getRelayoutBoundary",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node." }
                ],
                "returns": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Relayout boundary node id for the given node." }
                ],
                "description": "Returns the id of the nearest ancestor that is a relayout boundary.",
                "hidden": true
            },
            {
                "name": "getHighlightObjectForTest",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to get highlight object for." }
                ],
                "returns": [
                    { "name": "highlight", "type": "object", "description": "Highlight data for the node." }
                ],
                "description": "For testing.",
                "hidden": true
            }
        ],
        "events": [
            {
                "name": "documentUpdated",
                "description": "Fired when <code>Document</code> has been totally updated. Node ids are no longer valid."
            },
            {
                "name": "inspectNodeRequested",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node to inspect." }
                ],
                "description": "Fired when the node should be inspected. This happens after call to <code>setInspectModeEnabled</code>.",
                "hidden" : true
            },
            {
                "name": "setChildNodes",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Parent node id to populate with children." },
                    { "name": "nodes", "type": "array", "items": { "$ref": "Node" }, "description": "Child nodes array." }
                ],
                "description": "Fired when backend wants to provide client with the missing DOM structure. This happens upon most of the calls requesting node ids."
            },
            {
                "name": "attributeModified",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "name", "type": "string", "description": "Attribute name." },
                    { "name": "value", "type": "string", "description": "Attribute value." }
                ],
                "description": "Fired when <code>Element</code>'s attribute is modified."
            },
            {
                "name": "attributeRemoved",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "name", "type": "string", "description": "A ttribute name." }
                ],
                "description": "Fired when <code>Element</code>'s attribute is removed."
            },
            {
                "name": "inlineStyleInvalidated",
                "parameters": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Ids of the nodes for which the inline styles have been invalidated." }
                ],
                "description": "Fired when <code>Element</code>'s inline style is modified via a CSS property modification.",
                "hidden": true
            },
            {
                "name": "shadowHostDistributionInvalidated",
                "parameters": [
                    { "name": "nodeIds", "type": "array", "items": { "$ref": "NodeId" }, "description": "Ids of the shadow host nodes for which content distribution has been invalidated." }
                ],
                "description": "Fired when shadow host node content distribution is recalculated.",
                "hidden": true
            },
            {
                "name": "characterDataModified",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "characterData", "type": "string", "description": "New text value." }
                ],
                "description": "Mirrors <code>DOMCharacterDataModified</code> event."
            },
            {
                "name": "childNodeCountUpdated",
                "parameters": [
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "childNodeCount", "type": "integer", "description": "New node count." }
                ],
                "description": "Fired when <code>Container</code>'s child node count has changed."
            },
            {
                "name": "childNodeInserted",
                "parameters": [
                    { "name": "parentNodeId", "$ref": "NodeId", "description": "Id of the node that has changed." },
                    { "name": "previousNodeId", "$ref": "NodeId", "description": "If of the previous siblint." },
                    { "name": "node", "$ref": "Node", "description": "Inserted node data." }
                ],
                "description": "Mirrors <code>DOMNodeInserted</code> event."
            },
            {
                "name": "childNodeRemoved",
                "parameters": [
                    { "name": "parentNodeId", "$ref": "NodeId", "description": "Parent id." },
                    { "name": "nodeId", "$ref": "NodeId", "description": "Id of the node that has been removed." }
                ],
                "description": "Mirrors <code>DOMNodeRemoved</code> event."
            },
            {
                "name": "shadowRootPushed",
                "parameters": [
                    { "name": "hostId", "$ref": "NodeId", "description": "Host element id." },
                    { "name": "root", "$ref": "Node", "description": "Shadow root." }
                ],
                "description": "Called when shadow root is pushed into the element.",
                "hidden": true
            },
            {
                "name": "shadowRootPopped",
                "parameters": [
                    { "name": "hostId", "$ref": "NodeId", "description": "Host element id." },
                    { "name": "rootId", "$ref": "NodeId", "description": "Shadow root id." }
                ],
                "description": "Called when shadow root is popped from the element.",
                "hidden": true
            },
            {
                "name": "pseudoElementAdded",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Pseudo element's parent element id." },
                    { "name": "pseudoElement", "$ref": "Node", "description": "The added pseudo element." }
                ],
                "description": "Called when a pseudo element is added to an element.",
                "hidden": true
            },
            {
                "name": "pseudoElementRemoved",
                "parameters": [
                    { "name": "parentId", "$ref": "NodeId", "description": "Pseudo element's parent element id." },
                    { "name": "pseudoElementId", "$ref": "NodeId", "description": "The removed pseudo element id." }
                ],
                "description": "Called when a pseudo element is removed from an element.",
                "hidden": true
            }
        ]
    },
    {
        "domain": "CSS",
        "hidden": true,
        "description": "This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles) have an associated <code>id</code> used in subsequent operations on the related object. Each object type has a specific <code>id</code> structure, and those are not interchangeable between objects of different kinds. CSS objects can be loaded using the <code>get*ForNode()</code> calls (which accept a DOM node id). A client can also discover all the existing stylesheets with the <code>getAllStyleSheets()</code> method (or keeping track of the <code>styleSheetAdded</code>/<code>styleSheetRemoved</code> events) and subsequently load the required stylesheet contents using the <code>getStyleSheet[Text]()</code> methods.",
        "types": [
            {
                "id": "StyleSheetId",
                "type": "string"
            },
            {
                "id": "StyleSheetOrigin",
                "type": "string",
                "enum": ["injected", "user-agent", "inspector", "regular"],
                "description": "Stylesheet type: \"injected\" for stylesheets injected via extension, \"user-agent\" for user-agent stylesheets, \"inspector\" for stylesheets created by the inspector (i.e. those holding the \"via inspector\" rules), \"regular\" for regular stylesheets."
            },
            {
                "id": "PseudoIdMatches",
                "type": "object",
                "properties": [
                    { "name": "pseudoId", "type": "integer", "description": "Pseudo style identifier (see <code>enum PseudoId</code> in <code>LayoutStyleConstants.h</code>)."},
                    { "name": "matches", "type": "array", "items": { "$ref": "RuleMatch" }, "description": "Matches of CSS rules applicable to the pseudo style."}
                ],
                "description": "CSS rule collection for a single pseudo style."
            },
            {
                "id": "InheritedStyleEntry",
                "type": "object",
                "properties": [
                    { "name": "inlineStyle", "$ref": "CSSStyle", "optional": true, "description": "The ancestor node's inline style, if any, in the style inheritance chain." },
                    { "name": "matchedCSSRules", "type": "array", "items": { "$ref": "RuleMatch" }, "description": "Matches of CSS rules matching the ancestor node in the style inheritance chain." }
                ],
                "description": "Inherited CSS rule collection from ancestor node."
            },
            {
                "id": "RuleMatch",
                "type": "object",
                "properties": [
                    { "name": "rule", "$ref": "CSSRule", "description": "CSS rule in the match." },
                    { "name": "matchingSelectors", "type": "array", "items": { "type": "integer" }, "description": "Matching selector indices in the rule's selectorList selectors (0-based)." }
                ],
                "description": "Match data for a CSS rule."
            },
            {
                "id": "Selector",
                "type": "object",
                "properties": [
                    { "name": "value", "type": "string", "description": "Selector text." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "Selector range in the underlying resource (if available)." }
                ],
                "description": "Data for a simple selector (these are delimited by commas in a selector list)."
            },
            {
                "id": "SelectorList",
                "type": "object",
                "properties": [
                    { "name": "selectors", "type": "array", "items": { "$ref": "Selector" }, "description": "Selectors in the list." },
                    { "name": "text", "type": "string", "description": "Rule selector text." }
                ],
                "description": "Selector list data."
            },
            {
                "id": "CSSStyleSheetHeader",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The stylesheet identifier."},
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Owner frame identifier."},
                    { "name": "sourceURL", "type": "string", "description": "Stylesheet resource URL."},
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with the stylesheet (if any)." },
                    { "name": "origin", "$ref": "StyleSheetOrigin", "description": "Stylesheet origin."},
                    { "name": "title", "type": "string", "description": "Stylesheet title."},
                    { "name": "ownerNode", "$ref": "DOM.BackendNodeId", "optional": true, "description": "The backend id for the owner node of the stylesheet." },
                    { "name": "disabled", "type": "boolean", "description": "Denotes whether the stylesheet is disabled."},
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "Whether the sourceURL field value comes from the sourceURL comment." },
                    { "name": "isInline", "type": "boolean", "description": "Whether this stylesheet is created for STYLE tag by parser. This flag is not set for document.written STYLE tags." },
                    { "name": "startLine", "type": "number", "description": "Line offset of the stylesheet within the resource (zero based)." },
                    { "name": "startColumn", "type": "number", "description": "Column offset of the stylesheet within the resource (zero based)." }
                ],
                "description": "CSS stylesheet metainformation."
            },
            {
                "id": "CSSRule",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "selectorList", "$ref": "SelectorList", "description": "Rule selector data." },
                    { "name": "origin", "$ref": "StyleSheetOrigin", "description": "Parent stylesheet's origin."},
                    { "name": "style", "$ref": "CSSStyle", "description": "Associated style declaration." },
                    { "name": "media", "type": "array", "items": { "$ref": "CSSMedia" }, "optional": true, "description": "Media list array (for rules involving media queries). The array enumerates media queries starting with the innermost one, going outwards." }
                ],
                "description": "CSS rule representation."
            },
            {
                "id": "SourceRange",
                "type": "object",
                "properties": [
                    { "name": "startLine", "type": "integer", "description": "Start line of range." },
                    { "name": "startColumn", "type": "integer", "description": "Start column of range (inclusive)." },
                    { "name": "endLine", "type": "integer", "description": "End line of range" },
                    { "name": "endColumn", "type": "integer", "description": "End column of range (exclusive)." }
                ],
                "description": "Text range within a resource. All numbers are zero-based."
            },
            {
                "id": "ShorthandEntry",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Shorthand name." },
                    { "name": "value", "type": "string", "description": "Shorthand value." }
                ]
            },
            {
                "id": "CSSComputedStyleProperty",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "Computed style property name." },
                    { "name": "value", "type": "string", "description": "Computed style property value." }
                ]
            },
            {
                "id": "CSSStyle",
                "type": "object",
                "properties": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "The css style sheet identifier (absent for user agent stylesheet and user-specified stylesheet rules) this rule came from." },
                    { "name": "cssProperties", "type": "array", "items": { "$ref": "CSSProperty" }, "description": "CSS properties in the style." },
                    { "name": "shorthandEntries", "type": "array", "items": { "$ref": "ShorthandEntry" }, "description": "Computed values for all shorthands found in the style." },
                    { "name": "cssText", "type": "string", "optional": true, "description": "Style declaration text (if available)." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "Style declaration range in the enclosing stylesheet (if available)." }
                ],
                "description": "CSS style representation."
            },
            {
                "id": "CSSProperty",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "description": "The property name." },
                    { "name": "value", "type": "string", "description": "The property value." },
                    { "name": "important", "type": "boolean", "optional": true, "description": "Whether the property has \"!important\" annotation (implies <code>false</code> if absent)." },
                    { "name": "implicit", "type": "boolean", "optional": true, "description": "Whether the property is implicit (implies <code>false</code> if absent)." },
                    { "name": "text", "type": "string", "optional": true, "description": "The full property text as specified in the style." },
                    { "name": "parsedOk", "type": "boolean", "optional": true, "description": "Whether the property is understood by the browser (implies <code>true</code> if absent)." },
                    { "name": "disabled", "type": "boolean", "optional": true, "description": "Whether the property is disabled by the user (present for source-based properties only)." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "The entire property range in the enclosing style declaration (if available)." }
                ],
                "description": "CSS property declaration data."
            },
            {
                "id": "CSSMedia",
                "type": "object",
                "properties": [
                    { "name": "text", "type": "string", "description": "Media query text." },
                    { "name": "source", "type": "string", "enum": ["mediaRule", "importRule", "linkedSheet", "inlineSheet"], "description": "Source of the media query: \"mediaRule\" if specified by a @media rule, \"importRule\" if specified by an @import rule, \"linkedSheet\" if specified by a \"media\" attribute in a linked stylesheet's LINK tag, \"inlineSheet\" if specified by a \"media\" attribute in an inline stylesheet's STYLE tag." },
                    { "name": "sourceURL", "type": "string", "optional": true, "description": "URL of the document containing the media query description." },
                    { "name": "range", "$ref": "SourceRange", "optional": true, "description": "The associated rule (@media or @import) header range in the enclosing stylesheet (if available)." },
                    { "name": "parentStyleSheetId", "$ref": "StyleSheetId", "optional": true, "description": "Identifier of the stylesheet containing this object (if exists)." },
                    { "name": "mediaList", "type": "array", "items": { "$ref": "MediaQuery" }, "optional": true, "hidden": true, "description": "Array of media queries." }
                ],
                "description": "CSS media rule descriptor."
            },
            {
                "id": "MediaQuery",
                "type": "object",
                "properties": [
                    { "name": "expressions", "type": "array", "items": { "$ref": "MediaQueryExpression" }, "description": "Array of media query expressions." },
                    { "name": "active", "type": "boolean", "description": "Whether the media query condition is satisfied." }
                ],
                "description": "Media query descriptor.",
                "hidden": true
            },
            {
                "id": "MediaQueryExpression",
                "type": "object",
                "properties": [
                    { "name": "value", "type": "number", "description": "Media query expression value."},
                    { "name": "unit", "type": "string", "description": "Media query expression units."},
                    { "name": "feature", "type": "string", "description": "Media query expression feature."},
                    { "name": "valueRange", "$ref": "SourceRange", "optional": true, "description": "The associated range of the value text in the enclosing stylesheet (if available)." },
                    { "name": "computedLength", "type": "number", "optional": true, "description": "Computed length of media query expression (if applicable)."}
                ],
                "description": "Media query expression descriptor.",
                "hidden": true
            },
            {
                "id": "PlatformFontUsage",
                "type": "object",
                "properties": [
                    { "name": "familyName", "type": "string", "description": "Font's family name reported by platform."},
                    { "name": "glyphCount", "type": "number", "description": "Amount of glyphs that were rendered with this font."}
                ],
                "description": "Information about amount of glyphs that were rendered with given font.",
                "hidden": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "async": true,
                "description": "Enables the CSS agent for the given page. Clients should not assume that the CSS agent has been enabled until the result of this command is received."
            },
            {
                "name": "disable",
                "description": "Disables the CSS agent for the given page."
            },
            {
                "name": "getMatchedStylesForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" },
                    { "name": "excludePseudo", "type": "boolean", "optional": true, "description": "Whether to exclude pseudo styles (default: false)." },
                    { "name": "excludeInherited", "type": "boolean", "optional": true, "description": "Whether to exclude inherited styles (default: false)." }
                ],
                "returns": [
                    { "name": "matchedCSSRules", "type": "array", "items": { "$ref": "RuleMatch" }, "optional": true, "description": "CSS rules matching this node, from all applicable stylesheets." },
                    { "name": "pseudoElements", "type": "array", "items": { "$ref": "PseudoIdMatches" }, "optional": true, "description": "Pseudo style matches for this node." },
                    { "name": "inherited", "type": "array", "items": { "$ref": "InheritedStyleEntry" }, "optional": true, "description": "A chain of inherited styles (from the immediate node parent up to the DOM tree root)." }
                ],
                "description": "Returns requested styles for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getInlineStylesForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "inlineStyle", "$ref": "CSSStyle", "optional": true, "description": "Inline style for the specified DOM node." },
                    { "name": "attributesStyle", "$ref": "CSSStyle", "optional": true, "description": "Attribute-defined element style (e.g. resulting from \"width=20 height=100%\")."}
                ],
                "description": "Returns the styles defined inline (explicitly in the \"style\" attribute and implicitly, using DOM attributes) for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getComputedStyleForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "computedStyle", "type": "array", "items": { "$ref": "CSSComputedStyleProperty" }, "description": "Computed style for the specified DOM node." }
                ],
                "description": "Returns the computed style for a DOM node identified by <code>nodeId</code>."
            },
            {
                "name": "getPlatformFontsForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId" }
                ],
                "returns": [
                    { "name": "cssFamilyName", "type": "string", "description": "Font family name which is determined by computed style." },
                    { "name": "fonts", "type": "array", "items": { "$ref": "PlatformFontUsage" }, "description": "Usage statistics for every employed platform font." }
                ],
                "description": "Requests information about platform fonts which we used to render child TextNodes in the given node.",
                "hidden": true
            },
            {
                "name": "getStyleSheetText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" }
                ],
                "returns": [
                    { "name": "text", "type": "string", "description": "The stylesheet text." }
                ],
                "description": "Returns the current textual content and the URL for a stylesheet."
            },
            {
                "name": "setStyleSheetText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "text", "type": "string" }
                ],
                "description": "Sets the new stylesheet text."
            },
            {
                "name": "setPropertyText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange", "description": "Either a source range of the property to be edited or an empty range representing a position for the property insertion." },
                    { "name": "text", "type": "string" }
                ],
                "returns": [
                    { "name": "style", "$ref": "CSSStyle", "description": "The resulting style after the property text modification." }
                ],
                "description": "Either replaces a property identified by <code>styleSheetId</code> and <code>range</code> with <code>text</code> or inserts a new property <code>text</code> at the position identified by an empty <code>range</code>."
            },
            {
                "name": "setRuleSelector",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange" },
                    { "name": "selector", "type": "string" }
                ],
                "returns": [
                    { "name": "rule", "$ref": "CSSRule", "description": "The resulting rule after the selector modification." }
                ],
                "description": "Modifies the rule selector."
            },
            {
                "name": "setMediaText",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" },
                    { "name": "range", "$ref": "SourceRange" },
                    { "name": "text", "type": "string" }
                ],
                "returns": [
                    { "name": "media", "$ref": "CSSMedia", "description": "The resulting CSS media rule after modification." }
                ],
                "description": "Modifies the rule selector."
            },
            {
                "name": "createStyleSheet",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame where \"via-inspector\" stylesheet should be created."}
                ],
                "returns": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "Identifier of the created \"via-inspector\" stylesheet." }
                ],
                "description": "Creates a new special \"via-inspector\" stylesheet in the frame with given <code>frameId</code>."
            },
            {
                "name": "addRule",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "The css style sheet identifier where a new rule should be inserted." },
                    { "name": "ruleText", "type": "string", "description": "The text of a new rule." },
                    { "name": "location", "$ref": "SourceRange", "description": "Text position of a new rule in the target style sheet." }
                ],
                "returns": [
                    { "name": "rule", "$ref": "CSSRule", "description": "The newly created rule." }
                ],
                "description": "Inserts a new rule with the given <code>ruleText</code> in a stylesheet with given <code>styleSheetId</code>, at the position specified by <code>location</code>."
            },
            {
                "name": "forcePseudoState",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "The element id for which to force the pseudo state." },
                    { "name": "forcedPseudoClasses", "type": "array", "items": { "type": "string", "enum": ["active", "focus", "hover", "visited"] }, "description": "Element pseudo classes to force when computing the element's style." }
                ],
                "description": "Ensures that the given node will have specified pseudo-classes whenever its style is computed by the browser."
            },
            {
                "name": "getMediaQueries",
                "returns": [
                    { "name": "medias", "type": "array", "items": { "$ref": "CSSMedia" } }
                ],
                "description": "Returns all media queries parsed by the rendering engine.",
                "hidden": true
            }
        ],
        "events": [
            {
                "name": "mediaQueryResultChanged",
                "description": "Fires whenever a MediaQuery result changes (for example, after a browser window has been resized.) The current implementation considers only viewport-dependent media features."
            },
            {
                "name": "styleSheetChanged",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId" }
                ],
                "description": "Fired whenever a stylesheet is changed as a result of the client operation."
            },
            {
                "name": "styleSheetAdded",
                "parameters": [
                    { "name": "header", "$ref": "CSSStyleSheetHeader", "description": "Added stylesheet metainfo." }
                ],
                "description": "Fired whenever an active document stylesheet is added."
            },
            {
                "name": "styleSheetRemoved",
                "parameters": [
                    { "name": "styleSheetId", "$ref": "StyleSheetId", "description": "Identifier of the removed stylesheet." }
                ],
                "description": "Fired whenever an active document stylesheet is removed."
            }
        ]
    },
    {
        "domain": "Timeline",
        "description": "Timeline domain is deprecated. Please use Tracing instead.",
        "types": [
            {
                "id": "TimelineEvent",
                "type": "object",
                "properties": [
                    { "name": "type", "type": "string", "description": "Event type." },
                    { "name": "data", "type": "object", "description": "Event data." },
                    { "name": "startTime", "type": "number", "description": "Start time." },
                    { "name": "endTime", "type": "number", "optional": true, "description": "End time." },
                    { "name": "children", "type": "array", "optional": true, "items": { "$ref": "TimelineEvent" }, "description": "Nested records." },
                    { "name": "thread", "type": "string", "optional": true, "hidden": true, "description": "If present, identifies the thread that produced the event." },
                    { "name": "stackTrace", "$ref": "Console.StackTrace", "optional": true, "hidden": true, "description": "Stack trace." },
                    { "name": "frameId", "type": "string", "optional": true, "hidden": true, "description": "Unique identifier of the frame within the page that the event relates to." }
                ],
                "description": "Timeline record contains information about the recorded activity."
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Deprecated."
            },
            {
                "name": "disable",
                "description": "Deprecated."
            },
            {
                "name": "start",
                "parameters": [
                    { "name": "maxCallStackDepth", "optional": true, "type": "integer", "description": "Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5." },
                    { "name": "bufferEvents", "optional": true, "type": "boolean", "hidden": true, "description": "Whether instrumentation events should be buffered and returned upon <code>stop</code> call." },
                    { "name": "liveEvents", "optional": true, "type": "string", "hidden": true, "description": "Coma separated event types to issue although bufferEvents is set."},
                    { "name": "includeCounters", "optional": true, "type": "boolean", "hidden": true, "description": "Whether counters data should be included into timeline events." },
                    { "name": "includeGPUEvents", "optional": true, "type": "boolean", "hidden": true, "description": "Whether events from GPU process should be collected." }
                ],
                "description": "Deprecated."
            },
            {
                "name": "stop",
                "description": "Deprecated."
            }
        ],
        "events": [
            {
                "name": "eventRecorded",
                "parameters": [
                    { "name": "record", "$ref": "TimelineEvent", "description": "Timeline event record data." }
                ],
                "description": "Deprecated."
            }
        ]
    },
    {
        "domain": "Debugger",
        "description": "Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.",
        "types": [
            {
                "id": "BreakpointId",
                "type": "string",
                "description": "Breakpoint identifier."
            },
            {
                "id": "ScriptId",
                "type": "string",
                "description": "Unique script identifier."
            },
            {
                "id": "CallFrameId",
                "type": "string",
                "description": "Call frame identifier."
            },
            {
                "id": "Location",
                "type": "object",
                "properties": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Script identifier as reported in the <code>Debugger.scriptParsed</code>." },
                    { "name": "lineNumber", "type": "integer", "description": "Line number in the script (0-based)." },
                    { "name": "columnNumber", "type": "integer", "optional": true, "description": "Column number in the script (0-based)." }
                ],
                "description": "Location in the source code."
            },
            {
                "id": "FunctionDetails",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "location", "$ref": "Location", "description": "Location of the function." },
                    { "name": "functionName", "type": "string", "description": "Name of the function." },
                    { "name": "isGenerator", "type": "boolean", "description": "Whether this is a generator function." },
                    { "name": "scopeChain", "type": "array", "optional": true, "items": { "$ref": "Scope" }, "description": "Scope chain for this closure." }
                ],
                "description": "Information about the function."
            },
            {
                "id": "GeneratorObjectDetails",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "function", "$ref": "Runtime.RemoteObject", "description": "Generator function." },
                    { "name": "functionName", "type": "string", "description": "Name of the generator function." },
                    { "name": "status", "type": "string", "enum": ["running", "suspended", "closed"], "description": "Current generator object status." },
                    { "name": "location", "$ref": "Location", "optional": true, "description": "If suspended, location where generator function was suspended (e.g. location of the last 'yield'). Otherwise, location of the generator function." }
                ],
                "description": "Information about the generator object."
            },
            {
                "id": "CollectionEntry",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "key", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Entry key of a map-like collection, otherwise not provided." },
                    { "name": "value", "$ref": "Runtime.RemoteObject", "description": "Entry value." }
                ],
                "description": "Collection entry."
            },
            {
                "id": "CallFrame",
                "type": "object",
                "properties": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier. This identifier is only valid while the virtual machine is paused." },
                    { "name": "functionName", "type": "string", "description": "Name of the JavaScript function called on this call frame." },
                    { "name": "location", "$ref": "Location", "description": "Location in the source code." },
                    { "name": "scopeChain", "type": "array", "items": { "$ref": "Scope" }, "description": "Scope chain for this call frame." },
                    { "name": "this", "$ref": "Runtime.RemoteObject", "description": "<code>this</code> object for this call frame." },
                    { "name": "returnValue", "$ref": "Runtime.RemoteObject", "optional": true, "hidden": true, "description": "The value being returned, if the function is at return point." }
                ],
                "description": "JavaScript call frame. Array of call frames form the call stack."
            },
            {
                "id": "StackTrace",
                "type": "object",
                "properties": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call frames of the stack trace." },
                    { "name": "description", "type": "string", "optional": true, "description": "String label of this stack trace. For async traces this may be a name of the function that initiated the async call." },
                    { "name": "asyncStackTrace", "$ref": "StackTrace", "optional": true, "description": "Async stack trace, if any." }
                ],
                "description": "JavaScript call stack, including async stack traces.",
                "hidden": true
            },
            {
                "id": "Scope",
                "type": "object",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["global", "local", "with", "closure", "catch", "block", "script"], "description": "Scope type." },
                    { "name": "object", "$ref": "Runtime.RemoteObject", "description": "Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties." }
                ],
                "description": "Scope description."
            },
            {
                "id": "ExceptionDetails",
                "type": "object",
                "description": "Detailed information on exception (or error) that was thrown during script compilation or execution.",
                "properties": [
                    { "name": "text", "type": "string", "description": "Exception text." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the message origin." },
                    { "name": "scriptId", "type": "string", "optional": true, "description": "Script ID of the message origin." },
                    { "name": "line", "type": "integer", "optional": true, "description": "Line number in the resource that generated this message." },
                    { "name": "column", "type": "integer", "optional": true, "description": "Column number in the resource that generated this message." },
                    { "name": "stackTrace", "$ref": "Console.StackTrace", "optional": true, "description": "JavaScript stack trace for assertions and error messages." }
                ]
            },
            {
                "id": "SetScriptSourceError",
                "type": "object",
                "properties": [
                    { "name": "compileError", "optional": true, "type": "object", "properties":
                        [
                            { "name": "message", "type": "string", "description": "Compiler error message" },
                            { "name": "lineNumber", "type": "integer", "description": "Compile error line number (1-based)" },
                            { "name": "columnNumber", "type": "integer", "description": "Compile error column number (1-based)" }
                        ]
                    }
                ],
                "description": "Error data for setScriptSource command. compileError is a case type for uncompilable script source error.",
                "hidden": true
            },
            {
                "id": "PromiseDetails",
                "type": "object",
                "description": "Information about the promise.",
                "properties": [
                    { "name": "id", "type": "integer", "description": "Unique id of the promise." },
                    { "name": "status", "type": "string", "enum": ["pending", "resolved", "rejected"], "description": "Status of the promise." },
                    { "name": "parentId", "type": "integer", "optional": true, "description": "Id of the parent promise." },
                    { "name": "callFrame", "$ref": "Console.CallFrame", "optional": true, "description": "Top call frame on promise creation."},
                    { "name": "creationTime", "type": "number", "optional": true, "description": "Creation time of the promise." },
                    { "name": "settlementTime", "type": "number", "optional": true, "description": "Settlement time of the promise." },
                    { "name": "creationStack", "$ref": "Console.StackTrace", "optional": true, "description": "JavaScript stack trace on promise creation." },
                    { "name": "asyncCreationStack", "$ref": "Console.AsyncStackTrace", "optional": true, "description": "JavaScript asynchronous stack trace on promise creation, if available." },
                    { "name": "settlementStack", "$ref": "Console.StackTrace", "optional": true, "description": "JavaScript stack trace on promise settlement." },
                    { "name": "asyncSettlementStack", "$ref": "Console.AsyncStackTrace", "optional": true, "description": "JavaScript asynchronous stack trace on promise settlement, if available." }
                ],
                "hidden": true
            },
            {
                "id": "AsyncOperation",
                "type": "object",
                "description": "Information about the async operation.",
                "properties": [
                    { "name": "id", "type": "integer", "description": "Unique id of the async operation." },
                    { "name": "description", "type": "string", "description": "String description of the async operation." },
                    { "name": "stackTrace", "$ref": "Console.StackTrace", "optional": true, "description": "Stack trace where async operation was scheduled." },
                    { "name": "asyncStackTrace", "$ref": "Console.AsyncStackTrace", "optional": true, "description": "Asynchronous stack trace where async operation was scheduled, if available." }
                ],
                "hidden": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received."
            },
            {
                "name": "disable",
                "description": "Disables debugger for given page."
            },
            {
                "name": "setBreakpointsActive",
                "parameters": [
                    { "name": "active", "type": "boolean", "description": "New value for breakpoints active state." }
                ],
                "description": "Activates / deactivates all breakpoints on the page."
            },
            {
                "name": "setSkipAllPauses",
                "hidden": true,
                "parameters": [
                    { "name": "skipped", "type": "boolean", "description": "New value for skip pauses state." },
                    { "name": "untilReload", "type": "boolean", "optional": true, "description": "Whether page reload should set skipped to false." }
                ],
                "description": "Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc)."
            },
            {
                "name": "setBreakpointByUrl",
                "parameters": [
                    { "name": "lineNumber", "type": "integer", "description": "Line number to set breakpoint at." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the resources to set breakpoint on." },
                    { "name": "urlRegex", "type": "string", "optional": true, "description": "Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified." },
                    { "name": "columnNumber", "type": "integer", "optional": true, "description": "Offset in the line to set breakpoint at." },
                    { "name": "condition", "type": "string", "optional": true, "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true." }
                ],
                "returns": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Id of the created breakpoint for further reference." },
                    { "name": "locations", "type": "array", "items": { "$ref": "Location" }, "description": "List of the locations this breakpoint resolved into upon addition." }
                ],
                "description": "Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads."
            },
            {
                "name": "setBreakpoint",
                "parameters": [
                    { "name": "location", "$ref": "Location", "description": "Location to set breakpoint in." },
                    { "name": "condition", "type": "string", "optional": true, "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true." }
                ],
                "returns": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Id of the created breakpoint for further reference." },
                    { "name": "actualLocation", "$ref": "Location", "description": "Location this breakpoint resolved into." }
                ],
                "description": "Sets JavaScript breakpoint at a given location."
            },
            {
                "name": "removeBreakpoint",
                "parameters": [
                    { "name": "breakpointId", "$ref": "BreakpointId" }
                ],
                "description": "Removes JavaScript breakpoint."
            },
            {
                "name": "continueToLocation",
                "parameters": [
                    { "name": "location", "$ref": "Location", "description": "Location to continue to." },
                    { "name": "interstatementLocation", "type": "boolean", "optional": true, "hidden": true, "description": "Allows breakpoints at the intemediate positions inside statements." }
                ],
                "description": "Continues execution until specific location is reached."
            },
            {
                "name": "stepOver",
                "description": "Steps over the statement."
            },
            {
                "name": "stepInto",
                "description": "Steps into the function call."
            },
            {
                "name": "stepOut",
                "description": "Steps out of the function call."
            },
            {
                "name": "pause",
                "description": "Stops on the next JavaScript statement."
            },
            {
                "name": "resume",
                "description": "Resumes JavaScript execution."
            },
            {
                "name": "stepIntoAsync",
                "description": "Steps into the first async operation handler that was scheduled by or after the current statement.",
                "hidden": true
            },
            {
                "name": "searchInContent",
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Id of the script to search in." },
                    { "name": "query", "type": "string", "description": "String to search for."  },
                    { "name": "caseSensitive", "type": "boolean", "optional": true, "description": "If true, search is case sensitive." },
                    { "name": "isRegex", "type": "boolean", "optional": true, "description": "If true, treats string parameter as regex." }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "Page.SearchMatch" }, "description": "List of search matches." }
                ],
                "description": "Searches for given string in script content."
            },
            {
                "name": "canSetScriptSource",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if <code>setScriptSource</code> is supported." }
                ],
                "description": "Always returns true."
            },
            {
                "name": "setScriptSource",
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Id of the script to edit." },
                    { "name": "scriptSource", "type": "string", "description": "New content of the script." },
                    { "name": "preview", "type": "boolean", "optional": true, "description": " If true the change will not actually be applied. Preview mode may be used to get result description without actually modifying the code.", "hidden": true }
                ],
                "returns": [
                    { "name": "callFrames", "type": "array", "optional": true, "items": { "$ref": "CallFrame" }, "description": "New stack trace in case editing has happened while VM was stopped." },
                    { "name": "result", "type": "object", "optional": true, "description": "VM-specific description of the changes applied.", "hidden": true },
                    { "name": "asyncStackTrace", "$ref": "StackTrace", "optional": true, "description": "Async stack trace, if any.", "hidden": true }
                ],
                "error": {
                    "$ref": "SetScriptSourceError"
                },
                "description": "Edits JavaScript source live."
            },
            {
                "name": "restartFrame",
                "parameters": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier to evaluate on." }
                ],
                "returns": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "New stack trace." },
                    { "name": "result", "type": "object", "description": "VM-specific description." },
                    { "name": "asyncStackTrace", "$ref": "StackTrace", "optional": true, "description": "Async stack trace, if any." }
                ],
                "hidden": true,
                "description": "Restarts particular call frame from the beginning."
            },
            {
                "name": "getScriptSource",
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Id of the script to get source for." }
                ],
                "returns": [
                    { "name": "scriptSource", "type": "string", "description": "Script source." }
                ],
                "description": "Returns source for the script with given id."
            },
            {
                "name": "getFunctionDetails",
                "hidden": true,
                "parameters": [
                    { "name": "functionId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the function to get details for." }
                ],
                "returns": [
                    { "name": "details", "$ref": "FunctionDetails", "description": "Information about the function." }
                ],
                "description": "Returns detailed information on given function."
            },
            {
                "name": "getGeneratorObjectDetails",
                "hidden": true,
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the generator object to get details for." }
                ],
                "returns": [
                    { "name": "details", "$ref": "GeneratorObjectDetails", "description": "Information about the generator object." }
                ],
                "description": "Returns detailed information on given generator object."
            },
            {
                "name": "getCollectionEntries",
                "hidden": true,
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the collection to get entries for." }
                ],
                "returns": [
                    { "name": "entries", "type": "array", "items": { "$ref": "CollectionEntry" }, "description": "Array of collection entries." }
                ],
                "description": "Returns entries of given collection."
            },
            {
                "name": "setPauseOnExceptions",
                "parameters": [
                    { "name": "state", "type": "string", "enum": ["none", "uncaught", "all"], "description": "Pause on exceptions mode." }
                ],
                "description": "Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>."
            },
            {
                "name": "evaluateOnCallFrame",
                "parameters": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier to evaluate on." },
                    { "name": "expression", "type": "string", "description": "Expression to evaluate." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>)." },
                    { "name": "includeCommandLineAPI", "type": "boolean", "optional": true, "description": "Specifies whether command line API should be available to the evaluated expression, defaults to false.", "hidden": true },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object that should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "description": "Object wrapper for the evaluation result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "exceptionDetails", "$ref": "Debugger.ExceptionDetails", "optional": true, "hidden": true, "description": "Exception details."}
                ],
                "description": "Evaluates expression on a given call frame."
            },
            {
                "name": "compileScript",
                "hidden": true,
                "parameters": [
                    { "name": "expression", "type": "string", "description": "Expression to compile." },
                    { "name": "sourceURL", "type": "string", "description": "Source url to be set for the script." },
                    { "name": "persistScript", "type": "boolean", "description": "Specifies whether the compiled script should be persisted." },
                    { "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "optional": true, "description": "Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page." }
                ],
                "returns": [
                    { "name": "scriptId", "$ref": "ScriptId", "optional": true, "description": "Id of the script." },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "description": "Exception details."}
                ],
                "description": "Compiles expression."
            },
            {
                "name": "runScript",
                "hidden": true,
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Id of the script to run." },
                    { "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "optional": true, "description": "Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "description": "Run result." },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "description": "Exception details."}
                ],
                "description": "Runs script with given id in a given context."
            },
            {
                "name": "setVariableValue",
                "parameters": [
                    { "name": "scopeNumber", "type": "integer", "description": "0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually." },
                    { "name": "variableName", "type": "string", "description": "Variable name." },
                    { "name": "newValue", "$ref": "Runtime.CallArgument", "description": "New variable value." },
                    { "name": "callFrameId", "$ref": "CallFrameId", "optional": true, "description": "Id of callframe that holds variable." },
                    { "name": "functionObjectId", "$ref": "Runtime.RemoteObjectId", "optional": true, "description": "Object id of closure (function) that holds variable." }
                ],
                "hidden": true,
                "description": "Changes value of variable in a callframe or a closure. Either callframe or function must be specified. Object-based scopes are not supported and must be mutated manually."
            },
            {
                "name": "getStepInPositions",
                "parameters": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Id of a call frame where the current statement should be analized" }
                ],
                "returns": [
                    { "name": "stepInPositions", "type": "array", "items": { "$ref": "Location" }, "optional": true, "description": "experimental" }
                ],
                "hidden": true,
                "description": "Lists all positions where step-in is possible for a current statement in a specified call frame"
            },
            {
                "name": "getBacktrace",
                "returns": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call stack the virtual machine stopped on." },
                    { "name": "asyncStackTrace", "$ref": "StackTrace", "optional": true, "description": "Async stack trace, if any." }
                ],
                "hidden": true,
                "description": "Returns call stack including variables changed since VM was paused. VM must be paused."
            },
            {
                "name": "skipStackFrames",
                "parameters": [
                    { "name": "script", "type": "string", "optional": true, "description": "Regular expression defining the scripts to ignore while stepping." },
                    { "name": "skipContentScripts", "type": "boolean", "optional": true, "description": "True, if all content scripts should be ignored." }
                ],
                "hidden": true,
                "description": "Makes backend skip steps in the sources with names matching given pattern. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful."
            },
            {
                "name": "setAsyncCallStackDepth",
                "parameters": [
                    { "name": "maxDepth", "type": "integer", "description": "Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default)." }
                ],
                "hidden": true,
                "description": "Enables or disables async call stacks tracking."
            },
            {
                "name": "enablePromiseTracker",
                "parameters": [
                    { "name": "captureStacks", "type": "boolean", "optional": true, "description": "Whether to capture stack traces for promise creation and settlement events (default: false)." }
                ],
                "hidden": true,
                "description": "Enables promise tracking, information about <code>Promise</code>s created or updated will now be stored on the backend."
            },
            {
                "name": "disablePromiseTracker",
                "hidden": true,
                "description": "Disables promise tracking."
            },
            {
                "name": "getPromises",
                "returns": [
                    { "name": "promises", "type": "array", "items": { "$ref": "PromiseDetails" }, "description": "Information about stored promises." }
                ],
                "hidden": true,
                "description": "Returns detailed information about all <code>Promise</code>s that were created or updated after the <code>enablePromiseTracker</code> command, and have not been garbage collected yet."
            },
            {
                "name": "getPromiseById",
                "parameters": [
                    { "name": "promiseId", "type": "integer" },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." }
                ],
                "returns": [
                    { "name": "promise", "$ref": "Runtime.RemoteObject", "description": "Object wrapper for <code>Promise</code> with specified ID, if any." }
                ],
                "hidden": true,
                "description": "Returns <code>Promise</code> with specified ID."
            },
            {
                "name": "flushAsyncOperationEvents",
                "hidden": true,
                "description": "Fires pending <code>asyncOperationStarted</code> events (if any), as if a debugger stepping session has just been started."
            },
            {
                "name": "setAsyncOperationBreakpoint",
                "parameters": [
                    { "name": "operationId", "type": "integer", "description": "ID of the async operation to set breakpoint for." }
                ],
                "hidden": true,
                "description": "Sets breakpoint on AsyncOperation callback handler."
            },
            {
                "name": "removeAsyncOperationBreakpoint",
                "parameters": [
                    { "name": "operationId", "type": "integer", "description": "ID of the async operation to remove breakpoint for." }
                ],
                "hidden": true,
                "description": "Removes AsyncOperation breakpoint."
            }
        ],
        "events": [
            {
                "name": "globalObjectCleared",
                "description": "Called when global has been cleared and debugger client should reset its state. Happens upon navigation or reload."
            },
            {
                "name": "scriptParsed",
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Identifier of the script parsed." },
                    { "name": "url", "type": "string", "description": "URL or name of the script parsed (if any)." },
                    { "name": "startLine", "type": "integer", "description": "Line offset of the script within the resource with given URL (for script tags)." },
                    { "name": "startColumn", "type": "integer", "description": "Column offset of the script within the resource with given URL." },
                    { "name": "endLine", "type": "integer", "description": "Last line of the script." },
                    { "name": "endColumn", "type": "integer", "description": "Length of the last line of the script." },
                    { "name": "isContentScript", "type": "boolean", "optional": true, "description": "Determines whether this script is a user extension script." },
                    { "name": "isInternalScript", "type": "boolean", "optional": true, "description": "Determines whether this script is an internal script.", "hidden": true },
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with script (if any)." },
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "True, if this script has sourceURL.", "hidden": true }
                ],
                "description": "Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger."
            },
            {
                "name": "scriptFailedToParse",
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Identifier of the script parsed." },
                    { "name": "url", "type": "string", "description": "URL or name of the script parsed (if any)." },
                    { "name": "startLine", "type": "integer", "description": "Line offset of the script within the resource with given URL (for script tags)." },
                    { "name": "startColumn", "type": "integer", "description": "Column offset of the script within the resource with given URL." },
                    { "name": "endLine", "type": "integer", "description": "Last line of the script." },
                    { "name": "endColumn", "type": "integer", "description": "Length of the last line of the script." },
                    { "name": "isContentScript", "type": "boolean", "optional": true, "description": "Determines whether this script is a user extension script." },
                    { "name": "isInternalScript", "type": "boolean", "optional": true, "description": "Determines whether this script is an internal script.", "hidden": true },
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with script (if any)." },
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "True, if this script has sourceURL.", "hidden": true }
                ],
                "description": "Fired when virtual machine fails to parse the script."
            },
            {
                "name": "breakpointResolved",
                "parameters": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Breakpoint unique identifier." },
                    { "name": "location", "$ref": "Location", "description": "Actual breakpoint location." }
                ],
                "description": "Fired when breakpoint is resolved to an actual script and location."
            },
            {
                "name": "paused",
                "parameters": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call stack the virtual machine stopped on." },
                    { "name": "reason", "type": "string", "enum": [ "XHR", "DOM", "EventListener", "exception", "assert", "CSPViolation", "debugCommand", "promiseRejection", "AsyncOperation", "other" ], "description": "Pause reason." },
                    { "name": "data", "type": "object", "optional": true, "description": "Object containing break-specific auxiliary properties." },
                    { "name": "hitBreakpoints", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Hit breakpoints IDs", "hidden": true },
                    { "name": "asyncStackTrace", "$ref": "StackTrace", "optional": true, "description": "Async stack trace, if any.", "hidden": true }
                ],
                "description": "Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria."
            },
            {
                "name": "resumed",
                "description": "Fired when the virtual machine resumed execution."
            },
            {
                "name": "promiseUpdated",
                "parameters": [
                    { "name": "eventType", "type": "string", "enum": ["new", "update", "gc"], "description": "Type of the event." },
                    { "name": "promise", "$ref": "PromiseDetails", "description": "Information about the updated <code>Promise</code>." }
                ],
                "description": "Fired when a <code>Promise</code> is created, updated or garbage collected.",
                "hidden": true
            },
            {
                "name": "asyncOperationStarted",
                "parameters": [
                    { "name": "operation", "$ref": "AsyncOperation", "description": "Information about the async operation." }
                ],
                "description": "Fired when an async operation is scheduled (while in a debugger stepping session).",
                "hidden": true
            },
            {
                "name": "asyncOperationCompleted",
                "parameters": [
                    { "name": "id", "type": "integer", "description": "ID of the async operation that was completed." }
                ],
                "description": "Fired when an async operation is completed (while in a debugger stepping session).",
                "hidden": true
            }
        ]
    },
    {
        "domain": "DOMDebugger",
        "description": "DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.",
        "types": [
            {
                "id": "DOMBreakpointType",
                "type": "string",
                "enum": ["subtree-modified", "attribute-modified", "node-removed"],
                "description": "DOM breakpoint type."
            }
        ],
        "commands": [
            {
                "name": "setDOMBreakpoint",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Identifier of the node to set breakpoint on." },
                    { "name": "type", "$ref": "DOMBreakpointType", "description": "Type of the operation to stop upon." }
                ],
                "description": "Sets breakpoint on particular operation with DOM."
            },
            {
                "name": "removeDOMBreakpoint",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Identifier of the node to remove breakpoint from." },
                    { "name": "type", "$ref": "DOMBreakpointType", "description": "Type of the breakpoint to remove." }
                ],
                "description": "Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>."
            },
            {
                "name": "setEventListenerBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "DOM Event name to stop on (any DOM event will do)." },
                    { "name": "targetName", "type": "string", "optional": true, "description": "EventTarget interface name to stop on. If equal to <code>\"*\"</code> or not provided, will stop on any EventTarget.", "hidden": true }
                ],
                "description": "Sets breakpoint on particular DOM event."
            },
            {
                "name": "removeEventListenerBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Event name." },
                    { "name": "targetName", "type": "string", "optional": true, "description": "EventTarget interface name.", "hidden": true }
                ],
                "description": "Removes breakpoint on particular DOM event."
            },
            {
                "name": "setInstrumentationBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Instrumentation name to stop on." }
                ],
                "description": "Sets breakpoint on particular native event.",
                "hidden": true
            },
            {
                "name": "removeInstrumentationBreakpoint",
                "parameters": [
                    { "name": "eventName", "type": "string", "description": "Instrumentation name to stop on." }
                ],
                "description": "Removes breakpoint on particular native event.",
                "hidden": true
            },
            {
                "name": "setXHRBreakpoint",
                "parameters": [
                    { "name": "url", "type": "string", "description": "Resource URL substring. All XHRs having this substring in the URL will get stopped upon." }
                ],
                "description": "Sets breakpoint on XMLHttpRequest."
            },
            {
                "name": "removeXHRBreakpoint",
                "parameters": [
                    { "name": "url", "type": "string", "description": "Resource URL substring." }
                ],
                "description": "Removes breakpoint from XMLHttpRequest."
            }
        ]
    },
    {
        "domain": "Profiler",
        "hidden": true,
        "types": [
            {
                "id": "CPUProfileNode",
                "type": "object",
                "description": "CPU Profile node. Holds callsite information, execution statistics and child nodes.",
                "properties": [
                    { "name": "functionName", "type": "string", "description": "Function name." },
                    { "name": "scriptId", "$ref": "Debugger.ScriptId", "description": "Script identifier." },
                    { "name": "url", "type": "string", "description": "URL." },
                    { "name": "lineNumber", "type": "integer", "description": "1-based line number of the function start position." },
                    { "name": "columnNumber", "type": "integer", "description": "1-based column number of the function start position." },
                    { "name": "hitCount", "type": "integer", "description": "Number of samples where this node was on top of the call stack." },
                    { "name": "callUID", "type": "number", "description": "Call UID." },
                    { "name": "children", "type": "array", "items": { "$ref": "CPUProfileNode" }, "description": "Child nodes." },
                    { "name": "deoptReason", "type": "string", "description": "The reason of being not optimized. The function may be deoptimized or marked as don't optimize."},
                    { "name": "id", "type": "integer", "description": "Unique id of the node." },
                    { "name": "positionTicks", "type": "array", "items": { "$ref": "PositionTickInfo" }, "description": "An array of source position ticks." }
                ]
            },
            {
                "id": "CPUProfile",
                "type": "object",
                "description": "Profile.",
                "properties": [
                    { "name": "head", "$ref": "CPUProfileNode" },
                    { "name": "startTime", "type": "number", "description": "Profiling start time in seconds." },
                    { "name": "endTime", "type": "number", "description": "Profiling end time in seconds." },
                    { "name": "samples", "optional": true, "type": "array", "items": { "type": "integer" }, "description": "Ids of samples top nodes." },
                    { "name": "timestamps", "optional": true, "type": "array", "items": { "type": "number" }, "description": "Timestamps of the samples in microseconds." }
                ]
            },
            {
                "id": "PositionTickInfo",
                "type": "object",
                "description": "Specifies a number of samples attributed to a certain source position.",
                "properties": [
                    { "name": "line", "type": "integer", "description": "Source line number (1-based)." },
                    { "name": "ticks", "type": "integer", "description": "Number of samples attributed to the source line." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "setSamplingInterval",
                "parameters": [
                    { "name": "interval", "type": "integer", "description": "New sampling interval in microseconds." }
                ],
                "description": "Changes CPU profiler sampling interval. Must be called before CPU profiles recording started."
            },
            {
                "name": "start"
            },
            {
                "name": "stop",
                "returns": [
                    { "name": "profile", "$ref": "CPUProfile", "description": "Recorded profile." }
                ]
            }
        ],
        "events": [
            {
                "name": "consoleProfileStarted",
                "parameters": [
                    { "name": "id", "type": "string" },
                    { "name": "location", "$ref": "Debugger.Location", "description": "Location of console.profile()." },
                    { "name": "title", "type": "string", "optional": true, "description": "Profile title passed as argument to console.profile()." }

                ],
                "description": "Sent when new profile recodring is started using console.profile() call."
            },
            {
                "name": "consoleProfileFinished",
                "parameters": [
                    { "name": "id", "type": "string" },
                    { "name": "location", "$ref": "Debugger.Location", "description": "Location of console.profileEnd()." },
                    { "name": "profile", "$ref": "CPUProfile" },
                    { "name": "title", "type": "string", "optional": true, "description": "Profile title passed as argunet to console.profile()." }
                ]
            }
        ]
    },
    {
        "domain": "HeapProfiler",
        "hidden": true,
        "types": [
            {
                "id": "HeapSnapshotObjectId",
                "type": "string",
                "description": "Heap snapshot object id."
            }
        ],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "startTrackingHeapObjects",
                "parameters": [
                    { "name": "trackAllocations", "type": "boolean", "optional": true }
                ]
            },
            {
                "name": "stopTrackingHeapObjects",
                "parameters": [
                    { "name": "reportProgress", "type": "boolean", "optional": true, "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped." }
                ]

            },
            {
                "name": "takeHeapSnapshot",
                "parameters": [
                    { "name": "reportProgress", "type": "boolean", "optional": true, "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken." }
                ]
            },
            {
                "name": "collectGarbage"
            },
            {
                "name": "getObjectByHeapObjectId",
                "parameters": [
                    { "name": "objectId", "$ref": "HeapSnapshotObjectId" },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "description": "Evaluation result." }
                ]
            },
            {
                "name": "addInspectedHeapObject",
                "parameters": [
                    { "name": "heapObjectId", "$ref": "HeapSnapshotObjectId", "description": "Heap snapshot object id to be accessible by means of $x command line API." }
                ],
                "description": "Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions)."
            },
            {
                "name": "getHeapObjectId",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Identifier of the object to get heap object id for." }
                ],
                "returns": [
                    { "name": "heapSnapshotObjectId", "$ref": "HeapSnapshotObjectId", "description": "Id of the heap snapshot object corresponding to the passed remote object id." }
                ]
            }
        ],
        "events": [
            {
                "name": "addHeapSnapshotChunk",
                "parameters": [
                    { "name": "chunk", "type": "string" }
                ]
            },
            {
                "name": "resetProfiles"
            },
            {
                "name": "reportHeapSnapshotProgress",
                "parameters": [
                    { "name": "done", "type": "integer" },
                    { "name": "total", "type": "integer" },
                    { "name": "finished", "type": "boolean", "optional": true }
                ]
            },
            {
                "name": "lastSeenObjectId",
                "description": "If heap objects tracking has been started then backend regulary sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.",
                "parameters": [
                    { "name": "lastSeenObjectId", "type": "integer" },
                    { "name": "timestamp", "type": "number" }
                ]
            },
            {
                "name": "heapStatsUpdate",
                "description": "If heap objects tracking has been started then backend may send update for one or more fragments",
                "parameters": [
                    { "name": "statsUpdate", "type": "array", "items": { "type": "integer" }, "description": "An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment."}
                ]
            }
        ]
    },
    {
        "domain": "Worker",
        "hidden": true,
        "types": [],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "sendMessageToWorker",
                "parameters": [
                    { "name": "workerId", "type": "integer" },
                    { "name": "message", "type": "object" }
                ]
            },
            {
                "name": "canInspectWorkers",
                "description": "Tells whether browser supports workers inspection.",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if browser has workers support." }
                ]
            },
            {
                "name": "connectToWorker",
                "parameters": [
                    { "name": "workerId", "type": "integer" }
                ]
            },
            {
                "name": "disconnectFromWorker",
                "parameters": [
                    { "name": "workerId", "type": "integer" }
                ],
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "setAutoconnectToWorkers",
                "parameters": [
                    { "name": "value", "type": "boolean" }
                ]
            }
        ],
        "events": [
            {
                "name": "workerCreated",
                "parameters": [
                    { "name": "workerId", "type": "integer" },
                    { "name": "url", "type": "string" },
                    { "name": "inspectorConnected", "type": "boolean" }
                ]
            },
            {
                "name": "workerTerminated",
                "parameters": [
                    { "name": "workerId", "type": "integer" }
                ]
            },
            {
                "name": "dispatchMessageFromWorker",
                "parameters": [
                    { "name": "workerId", "type": "integer" },
                    { "name": "message", "type": "object" }
                ]
            },
            {
                "name": "disconnectedFromWorker",
                "handlers": ["browser"]
            }
        ]
    },
    {
        "domain": "Canvas",
        "hidden": true,
        "types": [
            {
                "id": "ResourceId",
                "type": "string",
                "description": "Unique resource identifier."
            },
            {
                "id": "ResourceStateDescriptor",
                "type": "object",
                "description": "Resource state descriptor.",
                "properties": [
                    { "name": "name", "type": "string", "description": "State name." },
                    { "name": "enumValueForName", "type": "string", "optional": true, "description": "String representation of the enum value, if <code>name</code> stands for an enum." },
                    { "name": "value", "$ref": "CallArgument", "optional": true, "description": "The value associated with the particular state." },
                    { "name": "values", "type": "array", "items": { "$ref": "ResourceStateDescriptor" }, "optional": true, "description": "Array of values associated with the particular state. Either <code>value</code> or <code>values</code> will be specified." },
                    { "name": "isArray", "type": "boolean", "optional": true, "description": "True iff the given <code>values</code> items stand for an array rather than a list of grouped states." }
                ]
            },
            {
                "id": "ResourceState",
                "type": "object",
                "description": "Resource state.",
                "properties": [
                    { "name": "id", "$ref": "ResourceId" },
                    { "name": "traceLogId", "$ref": "TraceLogId" },
                    { "name": "descriptors", "type": "array", "items": { "$ref": "ResourceStateDescriptor" }, "optional": true, "description": "Describes current <code>Resource</code> state." },
                    { "name": "imageURL", "type": "string", "optional": true, "description": "Screenshot image data URL." }
                ]
            },
            {
                "id": "CallArgument",
                "type": "object",
                "properties": [
                    { "name": "description", "type": "string", "description": "String representation of the object." },
                    { "name": "enumName", "type": "string", "optional": true, "description": "Enum name, if any, that stands for the value (for example, a WebGL enum name)." },
                    { "name": "resourceId", "$ref": "ResourceId", "optional": true, "description": "Resource identifier. Specified for <code>Resource</code> objects only." },
                    { "name": "type", "type": "string", "optional": true, "enum": ["object", "function", "undefined", "string", "number", "boolean"], "description": "Object type. Specified for non <code>Resource</code> objects only." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." },
                    { "name": "remoteObject", "$ref": "Runtime.RemoteObject", "optional": true, "description": "The <code>RemoteObject</code>, if requested." }
                ]
            },
            {
                "id": "Call",
                "type": "object",
                "properties": [
                    { "name": "contextId", "$ref": "ResourceId" },
                    { "name": "functionName", "type": "string", "optional": true },
                    { "name": "arguments", "type": "array", "items": { "$ref": "CallArgument" }, "optional": true },
                    { "name": "result", "$ref": "CallArgument", "optional": true },
                    { "name": "isDrawingCall", "type": "boolean", "optional": true },
                    { "name": "isFrameEndCall", "type": "boolean", "optional": true },
                    { "name": "property", "type": "string", "optional": true },
                    { "name": "value", "$ref": "CallArgument", "optional": true },
                    { "name": "sourceURL", "type": "string", "optional": true },
                    { "name": "lineNumber", "type": "integer", "optional": true },
                    { "name": "columnNumber", "type": "integer", "optional": true }
                ]
            },
            {
                "id": "TraceLogId",
                "type": "string",
                "description": "Unique trace log identifier."
            },
            {
                "id": "TraceLog",
                "type": "object",
                "properties": [
                    { "name": "id", "$ref": "TraceLogId" },
                    { "name": "calls", "type": "array", "items": { "$ref": "Call" } },
                    { "name": "contexts", "type": "array", "items": { "$ref": "CallArgument" } },
                    { "name": "startOffset", "type": "integer" },
                    { "name": "alive", "type": "boolean" },
                    { "name": "totalAvailableCalls", "type": "number" }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables Canvas inspection."
            },
            {
                "name": "disable",
                "description": "Disables Canvas inspection."
            },
            {
                "name": "dropTraceLog",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" }
                ]
            },
            {
                "name": "hasUninstrumentedCanvases",
                "returns": [
                    { "name": "result", "type": "boolean" }
                ],
                "description": "Checks if there is any uninstrumented canvas in the inspected page."
            },
            {
                "name": "captureFrame",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed." }
                ],
                "returns": [
                    { "name": "traceLogId", "$ref": "TraceLogId", "description": "Identifier of the trace log containing captured canvas calls." }
                ],
                "description": "Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared."
            },
            {
                "name": "startCapturing",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed." }
                ],
                "returns": [
                    { "name": "traceLogId", "$ref": "TraceLogId", "description": "Identifier of the trace log containing captured canvas calls." }
                ],
                "description": "Starts (or continues) consecutive canvas frames capturing. The capturing is stopped by the corresponding stopCapturing command."
            },
            {
                "name": "stopCapturing",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" }
                ]
            },
            {
                "name": "getTraceLog",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" },
                    { "name": "startOffset", "type": "integer", "optional": true },
                    { "name": "maxLength", "type": "integer", "optional": true }
                ],
                "returns": [
                    { "name": "traceLog", "$ref": "TraceLog" }
                ]
            },
            {
                "name": "replayTraceLog",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" },
                    { "name": "stepNo", "type": "integer", "description": "Last call index in the trace log to replay (zero based)." }
                ],
                "returns": [
                    { "name": "resourceState", "$ref": "ResourceState" },
                    { "name": "replayTime", "type": "number", "description": "Replay time (in milliseconds)." }
                ]
            },
            {
                "name": "getResourceState",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" },
                    { "name": "resourceId", "$ref": "ResourceId" }
                ],
                "returns": [
                    { "name": "resourceState", "$ref": "ResourceState" }
                ]
            },
            {
                "name": "evaluateTraceLogCallArgument",
                "parameters": [
                    { "name": "traceLogId", "$ref": "TraceLogId" },
                    { "name": "callIndex", "type": "integer", "description": "Index of the call to evaluate on (zero based)." },
                    { "name": "argumentIndex", "type": "integer", "description": "Index of the argument to evaluate (zero based). Provide <code>-1</code> to evaluate call result." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "String object group name to put result into (allows rapid releasing resulting object handles using <code>Runtime.releaseObjectGroup</code>)." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Object wrapper for the evaluation result." },
                    { "name": "resourceState", "$ref": "ResourceState", "optional": true, "description": "State of the <code>Resource</code> object." }
                ],
                "description": "Evaluates a given trace call argument or its result."
            }
        ],
        "events": [
            {
                "name": "contextCreated",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "description": "Identifier of the frame containing a canvas with a context." }
                ],
                "description": "Fired when a canvas context has been created in the given frame. The context may not be instrumented (see hasUninstrumentedCanvases command)."
            },
            {
                "name": "traceLogsRemoved",
                "parameters": [
                    { "name": "frameId", "$ref": "Page.FrameId", "optional": true, "description": "If given, trace logs from the given frame were removed." },
                    { "name": "traceLogId", "$ref": "TraceLogId", "optional": true, "description": "If given, trace log with the given ID was removed." }
                ],
                "description": "Fired when a set of trace logs were removed from the backend. If no parameters are given, all trace logs were removed."
            }
        ]
    },
    {
        "domain": "Input",
        "types": [
            {
                "id": "TouchPoint",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "state", "type": "string", "enum": ["touchPressed", "touchReleased", "touchMoved", "touchStationary", "touchCancelled"], "description": "State of the touch point." },
                    { "name": "x", "type": "integer", "description": "X coordinate of the event relative to the main frame's viewport."},
                    { "name": "y", "type": "integer", "description": "Y coordinate of the event relative to the main frame's viewport. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},
                    { "name": "radiusX", "type": "integer", "optional": true, "description": "X radius of the touch area (default: 1)."},
                    { "name": "radiusY", "type": "integer", "optional": true, "description": "Y radius of the touch area (default: 1)."},
                    { "name": "rotationAngle", "type": "number", "optional": true, "description": "Rotation angle (default: 0.0)."},
                    { "name": "force", "type": "number", "optional": true, "description": "Force (default: 1.0)."},
                    { "name": "id", "type": "number", "optional": true, "description": "Identifier used to track touch sources between events, must be unique within an event."}
                ]
            },
            {
                "id": "GestureSourceType",
                "type": "string",
                "hidden": true,
                "enum": ["default", "touch", "mouse"]
            }
        ],
        "commands": [
            {
                "name": "dispatchKeyEvent",
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["keyDown", "keyUp", "rawKeyDown", "char"], "description": "Type of the key event." },
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "type": "number", "optional": true, "description": "Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time)." },
                    { "name": "text", "type": "string", "optional": true, "description": "Text as generated by processing a virtual key code with a keyboard layout. Not needed for for <code>keyUp</code> and <code>rawKeyDown</code> events (default: \"\")" },
                    { "name": "unmodifiedText", "type": "string", "optional": true, "description": "Text that would have been generated by the keyboard if no modifiers were pressed (except for shift). Useful for shortcut (accelerator) key handling (default: \"\")." },
                    { "name": "keyIdentifier", "type": "string", "optional": true, "description": "Unique key identifier (e.g., 'U+0041') (default: \"\")." },
                    { "name": "code", "type": "string", "optional": true, "description": "Unique DOM defined string value for each physical key (e.g., 'KeyA') (default: \"\")." },
                    { "name": "windowsVirtualKeyCode", "type": "integer", "optional": true, "description": "Windows virtual key code (default: 0)." },
                    { "name": "nativeVirtualKeyCode", "type": "integer", "optional": true, "description": "Native virtual key code (default: 0)." },
                    { "name": "autoRepeat", "type": "boolean", "optional": true, "description": "Whether the event was generated from auto repeat (default: false)." },
                    { "name": "isKeypad", "type": "boolean", "optional": true, "description": "Whether the event was generated from the keypad (default: false)." },
                    { "name": "isSystemKey", "type": "boolean", "optional": true, "description": "Whether the event was a system key event (default: false)." }
                ],
                "description": "Dispatches a key event to the page."
            },
            {
                "name": "dispatchMouseEvent",
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["mousePressed", "mouseReleased", "mouseMoved"], "description": "Type of the mouse event." },
                    { "name": "x", "type": "integer", "description": "X coordinate of the event relative to the main frame's viewport."},
                    { "name": "y", "type": "integer", "description": "Y coordinate of the event relative to the main frame's viewport. 0 refers to the top of the viewport and Y increases as it proceeds towards the bottom of the viewport."},
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "type": "number", "optional": true, "description": "Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time)." },
                    { "name": "button", "type": "string", "enum": ["none", "left", "middle", "right"], "optional": true, "description": "Mouse button (default: \"none\")." },
                    { "name": "clickCount", "type": "integer", "optional": true, "description": "Number of times the mouse button was clicked (default: 0)." }
                ],
                "description": "Dispatches a mouse event to the page.",
                "handlers": ["renderer"]
            },
            {
                "name": "dispatchTouchEvent",
                "hidden": true,
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["touchStart", "touchEnd", "touchMove"], "description": "Type of the touch event." },
                    { "name": "touchPoints", "type": "array", "items": { "$ref": "TouchPoint" }, "description": "Touch points." },
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "timestamp", "type": "number", "optional": true, "description": "Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970 (default: current time)." }
                ],
                "description": "Dispatches a touch event to the page."
            },
            {
                "name": "emulateTouchFromMouseEvent",
                "hidden": true,
                "parameters": [
                    { "name": "type", "type": "string", "enum": ["mousePressed", "mouseReleased", "mouseMoved", "mouseWheel"], "description": "Type of the mouse event." },
                    { "name": "x", "type": "integer", "description": "X coordinate of the mouse pointer in DIP."},
                    { "name": "y", "type": "integer", "description": "Y coordinate of the mouse pointer in DIP."},
                    { "name": "timestamp", "type": "number", "description": "Time at which the event occurred. Measured in UTC time in seconds since January 1, 1970." },
                    { "name": "button", "type": "string", "enum": ["none", "left", "middle", "right"], "description": "Mouse button." },
                    { "name": "deltaX", "type": "number", "optional": true, "description": "X delta in DIP for mouse wheel event (default: 0)."},
                    { "name": "deltaY", "type": "number", "optional": true, "description": "Y delta in DIP for mouse wheel event (default: 0)."},
                    { "name": "modifiers", "type": "integer", "optional": true, "description": "Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0)." },
                    { "name": "clickCount", "type": "integer", "optional": true, "description": "Number of times the mouse button was clicked (default: 0)." }
                ],
                "description": "Emulates touch event from the mouse event parameters.",
                "handlers": ["browser"]
            },
            {
                "name": "synthesizePinchGesture",
                "async": true,
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "integer", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "scaleFactor", "type": "number", "description": "Relative scale factor after zooming (>1.0 zooms in, <1.0 zooms out)." },
                    { "name": "relativeSpeed", "type": "integer", "optional": true, "description": "Relative pointer speed in pixels per second (default: 800)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." }
                ],
                "description": "Synthesizes a pinch gesture over a time period by issuing appropriate touch events.",
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "synthesizeScrollGesture",
                "async": true,
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "integer", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "xDistance", "type": "integer", "optional": true, "description": "The distance to scroll along the X axis (positive to scroll left)." },
                    { "name": "yDistance", "type": "integer", "optional": true, "description": "The distance to scroll along the Y axis (positive to scroll up)." },
                    { "name": "xOverscroll", "type": "integer", "optional": true, "description": "The number of additional pixels to scroll back along the X axis, in addition to the given distance." },
                    { "name": "yOverscroll", "type": "integer", "optional": true, "description": "The number of additional pixels to scroll back along the Y axis, in addition to the given distance." },
                    { "name": "preventFling", "type": "boolean", "optional": true, "description": "Prevent fling (default: true)." },
                    { "name": "speed", "type": "integer", "optional": true, "description": "Swipe speed in pixels per second (default: 800)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." }
                ],
                "description": "Synthesizes a scroll gesture over a time period by issuing appropriate touch events.",
                "hidden": true,
                "handlers": ["browser"]
            },
            {
                "name": "synthesizeTapGesture",
                "async": true,
                "parameters": [
                    { "name": "x", "type": "integer", "description": "X coordinate of the start of the gesture in CSS pixels." },
                    { "name": "y", "type": "integer", "description": "Y coordinate of the start of the gesture in CSS pixels." },
                    { "name": "duration", "type": "integer", "optional": true, "description": "Duration between touchdown and touchup events in ms (default: 50)." },
                    { "name": "tapCount", "type": "integer", "optional": true, "description": "Number of times to perform the tap (e.g. 2 for double tap, default: 1)." },
                    { "name": "gestureSourceType", "$ref": "GestureSourceType", "optional": true, "description": "Which type of input events to be generated (default: 'default', which queries the platform for the preferred input type)." }
                ],
                "description": "Synthesizes a tap gesture over a time period by issuing appropriate touch events.",
                "hidden": true,
                "handlers": ["browser"]
            }
        ],
        "events": []
    },
    {
        "domain": "LayerTree",
        "hidden": true,
        "types": [
            {
                "id": "LayerId",
                "type": "string",
                "description": "Unique Layer identifier."
            },
            {
                "id": "SnapshotId",
                "type": "string",
                "description": "Unique snapshot identifier."
            },
            {
                "id": "ScrollRect",
                "type": "object",
                "description": "Rectangle where scrolling happens on the main thread.",
                "properties": [
                    { "name": "rect", "$ref": "DOM.Rect", "description": "Rectangle itself." },
                    { "name": "type", "type": "string", "enum": ["RepaintsOnScroll", "TouchEventHandler", "WheelEventHandler"], "description": "Reason for rectangle to force scrolling on the main thread" }
                ]
            },
            {
                "id": "PictureTile",
                "type": "object",
                "description": "Serialized fragment of layer picture along with its offset within the layer.",
                "properties": [
                    { "name": "x", "type": "number", "description": "Offset from owning layer left boundary" },
                    { "name": "y", "type": "number", "description": "Offset from owning layer top boundary" },
                    { "name": "picture", "type": "string", "description": "Base64-encoded snapshot data." }
                ]
            },
            {
                "id": "Layer",
                "type": "object",
                "description": "Information about a compositing layer.",
                "properties": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The unique id for this layer." },
                    { "name": "parentLayerId", "$ref": "LayerId", "optional": true, "description": "The id of parent (not present for root)." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "optional": true, "description": "The backend id for the node associated with this layer." },
                    { "name": "offsetX", "type": "number", "description": "Offset from parent layer, X coordinate." },
                    { "name": "offsetY", "type": "number", "description": "Offset from parent layer, Y coordinate." },
                    { "name": "width", "type": "number", "description": "Layer width." },
                    { "name": "height", "type": "number", "description": "Layer height." },
                    { "name": "transform", "type": "array", "items": { "type": "number" }, "minItems": 16, "maxItems": 16, "optional": true, "description": "Transformation matrix for layer, default is identity matrix" },
                    { "name": "anchorX", "type": "number", "optional": true, "description": "Transform anchor point X, absent if no transform specified" },
                    { "name": "anchorY", "type": "number", "optional": true, "description": "Transform anchor point Y, absent if no transform specified" },
                    { "name": "anchorZ", "type": "number", "optional": true, "description": "Transform anchor point Z, absent if no transform specified" },
                    { "name": "paintCount", "type": "integer", "description": "Indicates how many time this layer has painted." },
                    { "name": "drawsContent", "type": "boolean", "description": "Indicates whether this layer hosts any content, rather than being used for transform/scrolling purposes only." },
                    { "name": "invisible", "type": "boolean", "optional": true, "description": "Set if layer is not visible." },
                    { "name": "scrollRects", "type": "array", "items": { "$ref": "ScrollRect"}, "optional": true, "description": "Rectangles scrolling on main thread only."}
                ]
            },
            {
                "id": "PaintProfile",
                "type": "array",
                "description": "Array of timings, one per paint step.",
                "items": {
                    "type": "number",
                    "description": "A time in seconds since the end of previous step (for the first step, time since painting started)"
                }
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables compositing tree inspection."
            },
            {
                "name": "disable",
                "description": "Disables compositing tree inspection."
            },
            {
                "name": "compositingReasons",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the layer for which we want to get the reasons it was composited." }
                ],
                "description": "Provides the reasons why the given layer was composited.",
                "returns": [
                    { "name": "compositingReasons", "type": "array", "items": { "type": "string" }, "description": "A list of strings specifying reasons for the given layer to become composited." }
                ]
            },
            {
                "name": "makeSnapshot",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the layer." }
                ],
                "description": "Returns the layer snapshot identifier.",
                "returns": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ]
            },
            {
                "name": "loadSnapshot",
                "parameters": [
                    { "name": "tiles", "type": "array", "items": { "$ref": "PictureTile" }, "minItems": 1, "description": "An array of tiles composing the snapshot." }
                ],
                "description": "Returns the snapshot identifier.",
                "returns": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the snapshot." }
                ]
            },
            {
                "name": "releaseSnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ],
                "description": "Releases layer snapshot captured by the back-end."
            },
            {
                "name": "profileSnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." },
                    { "name": "minRepeatCount", "type": "integer", "optional": true, "description": "The maximum number of times to replay the snapshot (1, if not specified)." },
                    { "name": "minDuration", "type": "number", "optional": true, "description": "The minimum duration (in seconds) to replay the snapshot." },
                    { "name": "clipRect", "$ref": "DOM.Rect", "optional": true, "description": "The clip rectangle to apply when replaying the snapshot." }
                ],
                "returns": [
                    { "name": "timings", "type": "array", "items": { "$ref": "PaintProfile" }, "description": "The array of paint profiles, one per run." }
                ]
            },
            {
                "name": "replaySnapshot",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." },
                    { "name": "fromStep", "type": "integer", "optional": true, "description": "The first step to replay from (replay from the very start if not specified)." },
                    { "name": "toStep", "type": "integer", "optional": true, "description": "The last step to replay to (replay till the end if not specified)." },
                    { "name": "scale", "type": "number", "optional": true, "description": "The scale to apply while replaying (defaults to 1)." }
                ],
                "description": "Replays the layer snapshot and returns the resulting bitmap.",
                "returns": [
                    { "name": "dataURL", "type": "string", "description": "A data: URL for resulting image." }
                ]
            },
            {
                "name": "snapshotCommandLog",
                "parameters": [
                    { "name": "snapshotId", "$ref": "SnapshotId", "description": "The id of the layer snapshot." }
                ],
                "description": "Replays the layer snapshot and returns canvas log.",
                "returns": [
                    { "name": "commandLog", "type": "array", "items": { "type": "object" }, "description": "The array of canvas function calls." }
                ]
            }
        ],
        "events": [
            {
                "name": "layerTreeDidChange",
                "parameters": [
                    { "name": "layers", "type": "array", "items": { "$ref": "Layer" }, "optional": true, "description": "Layer tree, absent if not in the comspositing mode." }
                ]
            },
            {
                "name": "layerPainted",
                "parameters": [
                    { "name": "layerId", "$ref": "LayerId", "description": "The id of the painted layer." },
                    { "name": "clip", "$ref": "DOM.Rect", "description": "Clip rectangle." }
                ]
            }
        ]
    },
    {
        "domain": "DeviceOrientation",
        "hidden": true,
        "commands": [
            {
                "name": "setDeviceOrientationOverride",
                "description": "Overrides the Device Orientation.",
                "parameters": [
                    { "name": "alpha", "type": "number", "description": "Mock alpha"},
                    { "name": "beta", "type": "number", "description": "Mock beta"},
                    { "name": "gamma", "type": "number", "description": "Mock gamma"}
                ]
            },
            {
                "name": "clearDeviceOrientationOverride",
                "description": "Clears the overridden Device Orientation."
            }
        ]
    },
    {
        "domain": "Tracing",
        "commands": [
            {
                "name": "start",
                "async": true,
                "description": "Start trace events collection.",
                "parameters": [
                    { "name": "categories", "type": "string", "optional": true, "description": "Category/tag filter" },
                    { "name": "options", "type": "string", "optional": true, "description": "Tracing options" },
                    { "name": "bufferUsageReportingInterval", "type": "number", "optional": true, "description": "If set, the agent will issue bufferUsage events at this interval, specified in milliseconds" }
                ],
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "end",
                "async": true,
                "description": "Stop trace events collection.",
                "handlers": ["browser", "renderer"]
            },
            {
                "name": "getCategories",
                "async": true,
                "description": "Gets supported tracing categories.",
                "returns": [
                    { "name": "categories", "type": "array", "items": { "type": "string" }, "description": "A list of supported tracing categories." }
                ],
                "handlers": ["browser"]
            }
        ],
        "events": [
            {
                "name": "dataCollected",
                "parameters": [
                    { "name": "value", "type": "array", "items": { "type": "object" } }
                ],
                "description": "Contains an bucket of collected trace events. When tracing is stopped collected events will be send as a sequence of dataCollected events followed by tracingComplete event.",
                "handlers": ["browser"]
            },
            {
                "name": "tracingComplete",
                "description": "Signals that tracing is stopped and there is no trace buffers pending flush, all data were delivered via dataCollected events.",
                "handlers": ["browser"]
            },
            {
                "name": "bufferUsage",
                "parameters": [
                    { "name": "percentFull", "type": "number", "optional": true, "description": "A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size." },
                    { "name": "eventCount", "type": "number", "optional": true, "description": "An approximate number of events in the trace log." },
                    { "name": "value", "type": "number", "optional": true, "description": "A number in range [0..1] that indicates the used size of event buffer as a fraction of its total size." }
                ],
                "handlers": ["browser"]
            }
        ]
    },
    {
        "domain": "Power",
        "hidden": true,
        "types": [
            {
                "id": "PowerEvent",
                "type": "object",
                "properties": [
                    { "name": "type", "type": "string", "description": "Power Event Type." },
                    { "name": "timestamp", "type": "number", "description": "Power Event Time, in milliseconds." },
                    { "name": "value", "type": "number", "description": "Power Event Value." }
                ],
            "description": "PowerEvent item"
            }
        ],
        "commands": [
            {
                "name": "start",
                "description": "Start power events collection.",
                "parameters": [],
                "handlers": ["browser", "frontend"]
            },
            {
                "name": "end",
                "description": "Stop power events collection.",
                "parameters": [],
                "handlers": ["browser", "frontend"]
            },
            {
                "name": "canProfilePower",
                "description": "Tells whether power profiling is supported.",
                "returns": [
                  { "name": "result", "type": "boolean", "description": "True if power profiling is supported." }
                ],
                "hidden": true,
                "handlers": ["browser", "frontend"]
            },
            {
                "name": "getAccuracyLevel",
                "description": "Describes the accuracy level of the data provider.",
                "returns": [
                    { "name": "result", "type": "string", "enum": ["high", "moderate", "low"] }
                ],
                "handlers": ["browser", "frontend"]
            }
        ],
        "events": [
            {
                "name": "dataAvailable",
                "parameters": [
                    {"name": "value", "type": "array", "items": { "$ref": "PowerEvent" }, "description": "List of power events." }
                ],
                "handlers": ["browser", "frontend"]
            }
        ]
    },
    {
        "domain": "Animation",
        "hidden": true,
        "types": [
            {
                "id": "AnimationPlayer",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "id", "type": "string", "description": "<code>AnimationPlayer</code>'s id." },
                    { "name": "pausedState", "type": "boolean", "hidden": "true", "description": "<code>AnimationPlayer</code>'s internal paused state." },
                    { "name": "playState", "type": "string", "description": "<code>AnimationPlayer</code>'s play state." },
                    { "name": "playbackRate", "type": "number", "description": "<code>AnimationPlayer</code>'s playback rate." },
                    { "name": "startTime", "type": "number", "description": "<code>AnimationPlayer</code>'s start time." },
                    { "name": "currentTime", "type": "number", "description": "<code>AnimationPlayer</code>'s current time." },
                    { "name": "source", "$ref": "AnimationNode", "description": "<code>AnimationPlayer</code>'s source animation node." },
                    { "name": "type", "type": "string", "enum": ["CSSTransition", "CSSAnimation", "WebAnimation"], "description": "Animation type of <code>AnimationPlayer</code>." }
                ],
                "description": "AnimationPlayer instance."
            },
            {
                "id": "AnimationNode",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "delay", "type": "number", "description": "<code>AnimationNode</code>'s delay." },
                    { "name": "playbackRate", "type": "number", "description": "<code>AnimationNode</code>'s playbackRate." },
                    { "name": "iterationStart", "type": "number", "description": "<code>AnimationNode</code>'s iteration start." },
                    { "name": "iterations", "type": "number", "description": "<code>AnimationNode</code>'s iterations." },
                    { "name": "duration", "type": "number", "description": "<code>AnimationNode</code>'s iteration duration." },
                    { "name": "direction", "type": "string", "description": "<code>AnimationNode</code>'s playback direction." },
                    { "name": "fill", "type": "string", "description": "<code>AnimationNode</code>'s fill mode." },
                    { "name": "name", "type": "string", "description": "<code>AnimationNode</code>'s name." },
                    { "name": "backendNodeId", "$ref": "DOM.BackendNodeId", "description": "<code>AnimationNode</code>'s target node." },
                    { "name": "keyframesRule", "$ref": "KeyframesRule", "optional": true, "description": "<code>AnimationNode</code>'s keyframes." },
                    { "name": "easing", "type": "string", "description": "<code>AnimationNode</code>'s timing function." }
                ],
                "description": "AnimationNode instance"
            },
            {
                "id": "KeyframesRule",
                "type": "object",
                "properties": [
                    { "name": "name", "type": "string", "optional": true, "description": "CSS keyframed animation's name." },
                    { "name": "keyframes", "type": "array", "items": { "$ref": "KeyframeStyle" }, "description": "List of animation keyframes." }
                ],
                "description": "Keyframes Rule"
            },
            {
                "id": "KeyframeStyle",
                "type": "object",
                "properties": [
                    { "name": "offset", "type": "string", "description": "Keyframe's time offset." },
                    { "name": "style", "$ref": "CSS.CSSStyle", "description": "Keyframe's associated CSS style declaration." },
                    { "name": "easing", "type": "string", "description": "<code>AnimationNode</code>'s timing function." }
                ],
                "description": "Keyframe Style"
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables animation domain notifications."
            },
            {
                "name": "getAnimationPlayersForNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "Id of the node to get animation players for." },
                    { "name": "includeSubtreeAnimations", "type": "boolean", "description": "Include animations from elements subtree." }
                ],
                "returns": [
                    { "name": "animationPlayers", "type": "array", "items": { "$ref": "AnimationPlayer" }, "description": "Array of animation players." }
                ],
                "description": "Returns animation players relevant to the node.",
                "hidden": true
            },
            {
                "name": "getPlaybackRate",
                "returns": [
                    { "name": "playbackRate", "type": "number", "description": "Playback rate for animations on page."}
                ],
                "description": "Gets the playback rate of the document timeline."
            },
            {
                "name": "setPlaybackRate",
                "parameters": [
                    { "name": "playbackRate", "type": "number", "description": "Playback rate for animations on page" }
                ],
                "description": "Sets the playback rate of the document timeline."
            },
            {
                "name": "setCurrentTime",
                "parameters": [
                    { "name": "currentTime", "type": "number", "description": "Current time for the page animation timeline" }
                ],
                "description": "Sets the current time of the document timeline."
            }
        ],
        "events": [
            {
                "name": "animationPlayerCreated",
                "parameters": [
                    { "name": "player", "$ref": "AnimationPlayer", "description": "AnimationPlayer that was created." },
                    { "name": "resetTimeline", "type": "boolean", "description": "Whether the timeline should be reset." }
                ],
                "hidden": true
            }
        ]
    },
    {
        "domain": "Accessibility",
        "hidden": true,
        "types": [
            {
                "id": "AXNodeId",
                "type": "string",
                "description": "Unique accessibility node identifier."
            },
            {
                "id": "AXNode",
                "type": "object",
                "properties": [
                    { "name": "nodeId", "$ref": "AXNodeId", "description": "Unique identifier for this node." },
                    { "name": "role", "type": "string", "description": "This <code>Node</code>'s role, whether explicit or implicit." },
                    { "name": "name", "type": "string", "description": "The accessible name for this <code>Node</code>.", "optional": true },
                    { "name": "description", "type": "string", "description": "The accessible description for this <code>Node</code>.", "optional": true },
                    { "name": "value", "type": "any", "description": "The value for this <code>Node</code>.", "optional": true },
                    { "name": "help", "type": "string", "description": "Help.", "optional": true },
                    { "name": "liveRegionProperties", "type": "object", "description": "Live region properties.", "optional": true },
                    { "name": "globalStates", "type": "object", "description": "Global states.", "optional": true },
                    { "name": "widgetProperties", "type": "object", "description": "Widget properties.", "optional": true },
                    { "name": "widgetStates", "type": "object", "description": "Widget states.", "optional": true },
                    { "name": "relationships", "type": "object", "description": "Related nodes other than parent/child.", "optional": true }
                ],
                "description": "A node in the accessibility tree."
            }
        ],
        "commands": [
            {
                "name": "getAXNode",
                "parameters": [
                    { "name": "nodeId", "$ref": "DOM.NodeId", "description": "ID of node to get accessibility node for." }
                ],
                "returns": [
                    { "name": "accessibilityNode", "$ref": "AXNode", "description": "The <code>Accessibility.AXNode</code> for this DOM node, if it exists." }
                ],
                "description": "Fetches the accessibility node for this DOM node, if it exists.",
                "hidden": true
            }
        ]
    }]
};
