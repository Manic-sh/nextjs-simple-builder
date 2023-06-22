import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Builder, BuilderBlocks, withChildren } from '@builder.io/react'

import React, { FC } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// var x = `<scr'+'ipt src="https://player.vimeo.com/api/player.js"></script><script>
// (function() {
//    var config = {
//       webPagePseudoRoot: "/vimeovideotracking",
//       eventPaths: {
//          play: "play",
//          pause: "pause",
//          ended: "finish"
//       }
//    };

//    /* --- NO NEED TO TOUCH ANYTHING BELOW THIS LINE! --- */

//    var arrayify = getSelection.call.bind([].slice);

//    var vimeoStor = "IFRAME[src^='https://player.vimeo.com/video/']",
//       vimeoDOMObjects = document.querySelectorAll(vimeoStor);

//    function normalize(eventData) {
//       var transformOpts = {
//          scale: {
//             percent: 100
//          },
//          round: {
//             seconds: 0
//          },
//          SCALE_NO_SCALE: 1,
//          ROUND_2_DIGITS: 2
//       };
//       normData = {};

//       Object.keys(eventData).forEach(function(key) {
//          var scaleFactor =
//                transformOpts.scale[key] !== undefined
//                   ? transformOpts.scale[key]
//                   : transformOpts.SCALE_NO_SCALE,
//             roundFactor =
//                transformOpts.round[key] !== undefined
//                   ? transformOpts.round[key]
//                   : transformOpts.ROUND_2_DIGITS,
//             prePadding = Math.round(
//                eventData[key].toFixed(roundFactor) * scaleFactor
//             ),
//             padFactor = prePadding < 10 ? "0" : ""; // left-pad single digits for easier Marketo matching

//          normData[key] = padFactor + prePadding;
//       });

//       return normData;
//    }

//    arrayify(vimeoDOMObjects)
//       .map(function(vimeoDOMObject) {
//          return new Vimeo.Player(vimeoDOMObject);
//       })
//       .forEach(function(vimeoPlayer) {
//          vimeoPlayer.getVideoId().then(function(videoId) {
//             ["play", "pause", "ended"].forEach(function(eventType) {
//                vimeoPlayer.on(eventType, function(eventData) {
//                   var statsNormalized = normalize(eventData);

//                   var eventAsPath = [
//                      config.webPagePseudoRoot,
//                      videoId,
//                      config.eventPaths[eventType]
//                   ].join("/");

//                   var statsAsSearch = ["seconds", "percent"]
//                      .map(function(stat) {
//                         return [stat, statsNormalized[stat]].join("=");
//                      })
//                      .join("&");

//                   var munchkinPayload = {
//                      url: eventAsPath,
//                      params: statsAsSearch
//                   };

//                   Munchkin.munchkinFunction("visitWebPage", munchkinPayload);
//                });
//             });
//          });
//       });
// })();
// </script>`;

// var extractscript=/<script>(.+)<\/script>/gi.exec(x);
// x=x.replace(extractscript[0],"");



const VimeoPlayerTracking = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
<script src="https://player.vimeo.com/api/player.js"></script>
<script>
(function() {
   var config = {
      webPagePseudoRoot: "/vimeovideotracking",
      eventPaths: {
         play: "play",
         pause: "pause",
         ended: "finish"
      }
   };

   /* --- NO NEED TO TOUCH ANYTHING BELOW THIS LINE! --- */

   var arrayify = getSelection.call.bind([].slice);

   var vimeoStor = "IFRAME[src^='https://player.vimeo.com/video/']",
      vimeoDOMObjects = document.querySelectorAll(vimeoStor);

   function normalize(eventData) {
      var transformOpts = {
         scale: {
            percent: 100
         },
         round: {
            seconds: 0
         },
         SCALE_NO_SCALE: 1,
         ROUND_2_DIGITS: 2
      };
      normData = {};

      Object.keys(eventData).forEach(function(key) {
         var scaleFactor =
               transformOpts.scale[key] !== undefined
                  ? transformOpts.scale[key]
                  : transformOpts.SCALE_NO_SCALE,
            roundFactor =
               transformOpts.round[key] !== undefined
                  ? transformOpts.round[key]
                  : transformOpts.ROUND_2_DIGITS,
            prePadding = Math.round(
               eventData[key].toFixed(roundFactor) * scaleFactor
            ),
            padFactor = prePadding < 10 ? "0" : ""; // left-pad single digits for easier Marketo matching

         normData[key] = padFactor + prePadding;
      });

      return normData;
   }

   arrayify(vimeoDOMObjects)
      .map(function(vimeoDOMObject) {
         return new Vimeo.Player(vimeoDOMObject);
      })
      .forEach(function(vimeoPlayer) {
         vimeoPlayer.getVideoId().then(function(videoId) {
            ["play", "pause", "ended"].forEach(function(eventType) {
               vimeoPlayer.on(eventType, function(eventData) {
                  var statsNormalized = normalize(eventData);

                  var eventAsPath = [
                     config.webPagePseudoRoot,
                     videoId,
                     config.eventPaths[eventType]
                  ].join("/");

                  var statsAsSearch = ["seconds", "percent"]
                     .map(function(stat) {
                        return [stat, statsNormalized[stat]].join("=");
                     })
                     .join("&");

                  var munchkinPayload = {
                     url: eventAsPath,
                     params: statsAsSearch
                  };

                  Munchkin.munchkinFunction("visitWebPage", munchkinPayload);
               });
            });
         });
      });
})();
</script>
`,
    }}
  />
);

Builder.registerComponent(VimeoPlayerTracking, {
  name: "VimeoPlayerTracking",

});

// const ListObj = ({builderState: {state: {myObj }}}) => {
//    <div>{console.log(myObj)}</div>
// }

// Builder.registerComponent(ListObj, {
//    name: "List Object",
//  });

function CatalogContainer(props: any) {
   const {
     children,
     content,
     builderBlock,
   } = props;
 
   return (
     <div>
       <div>
         {children}
         <BuilderBlocks
           parentElementId={builderBlock.id}
           dataPath="component.options.content"
           blocks={content}
         />
       </div>
     </div>
   );
}

Builder.registerComponent(withChildren(CatalogContainer), {
   defaultStyles: { marginTop: "0" },
   name: "CATALOG_CONTAINER",
   image:
     "https://tabler-icons.io/static/tabler-icons/icons-png/box-model-2.png",
   inputs: [
     {
       name: "content",
       type: "uiBlocks",
       defaultValue: [],
     },
   ],
 });


// const MyComponent: React.FC<Props> = (props ) => {
//    const {
//       children,
//       content,
//       builderBlock,
//     } = props;
//   return (
//     <div
//       style={{
//         width: "800px",
//         height: "200px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         border: "1px solid #cccccc",
//         color: "#cccccc",
//       }}
//     >

//       {Array.isArray(children) && children.length > 0 ? (
//         React.Children.map(children, (child, index) => {
//           return (
//             <div
//               style={{
//                 width: "200px",
//                 height: "200px",
//               }}
//               key={`${index}`}
//             >
//               {child}
//             </div>
//           );
//         })
//       ) : (
//          <div>
//          {children}
//         <BuilderBlocks
//           parentElementId={builderBlock.id}
//           style={{
//             width: "200px",
//             height: "200px",
//           }}
//           dataPath="component.options.content"
//           blocks={content}
//         />
//         </div>
//       )}
//     </div>
//   );
// };

// const MyComponentWithChildren = withChildren(MyComponent);

// Builder.registerComponent(MyComponentWithChildren, {
//   name: "MyComponentWithChildren",
//   inputs: [
//    {
//      name: "content",
//      type: "uiBlocks",
//      defaultValue: [],
//    },
//  ],
// });

// function SLBox(props) {
//   const { groupID, content, children, builderBlock } = props;
//   return (
//     <div>
//       {children}
//       <BuilderBlocks
//         parentElementId={builderBlock.id}
//         dataPath={`component.options.content`}
//         blocks={content}
//       />
//     </div>
//   ) 
// }

// Builder.registerComponent(SLBox, {
//   name: "SLBox",
//   inputs: [
//     {
//       name: "content",
//       type: "uiBlocks",
//       defaultValue: [],
//     },
//   ]
// });

// const ListingComponent: FC<Props> = ({
//   resourceType = 'blog',
//   builderState: {
//     state: { postData },
//   },
// }) => {
//   const { posts, categories, sidebarCopy } = (postData && JSON.parse(postData)) || {};

//   const filters = [
//     {
//       title: resourceType === 'success' ? 'Browse by Industries' : 'Categories',
//       items: 10,
//     },
//   ];

//   return (
//     <div>
//       <span>{JSON.stringify(posts)}</span>
//        <p>{JSON.stringify(categories)}</p>   
//     </div>
//   );
// };

// Builder.registerComponent(ListingComponent, {
//   name: "ListingComponent",
// });

