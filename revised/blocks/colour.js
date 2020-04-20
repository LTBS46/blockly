/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Color blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

//goog.provide('Blockly.Blocks.color');  // Deprecated
//goog.provide('Blockly.Constants.Color');

//goog.require('Blockly');
//goog.require('Blockly.Blocks');
//goog.require('Blockly.FieldColor');
//goog.require('Blockly.FieldLabel');


Blockly.Blocks.color={};
Blockly.Constants={};
Blockly.Constants.Color={};
/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['COLOR_HUE']. (2018 April 5)
 */
Blockly.Constants.Color.HUE = 20;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for color picker.
  {
    "type": "color_picker",
    "message0": "%1",
    "args0": [
      {
        "type": "field_colour",
        "name": "COLOR",
        "color": "#ff0000"
      }
    ],
    "output": "Color",
    "helpUrl": "%{BKY_COLOR_PICKER_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOR_PICKER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"]
  },

  // Block for random color.
  {
    "type": "color_random",
    "message0": "%{BKY_COLOR_RANDOM_TITLE}",
    "output": "Color",
    "helpUrl": "%{BKY_COLOR_RANDOM_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOR_RANDOM_TOOLTIP}"
  },

  // Block for composing a color from RGB components.
  {
    "type": "color_rgb",
    "message0": "%{BKY_COLOR_RGB_TITLE} %{BKY_COLOR_RGB_RED} %1 %{BKY_COLOR_RGB_GREEN} %2 %{BKY_COLOR_RGB_BLUE} %3",
    "args0": [
      {
        "type": "input_value",
        "name": "RED",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "GREEN",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "BLUE",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "output": "Color",
    "helpUrl": "%{BKY_COLOR_RGB_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOR_RGB_TOOLTIP}"
  },

  // Block for blending two colors together.
  {
    "type": "color_blend",
    "message0": "%{BKY_COLOR_BLEND_TITLE} %{BKY_COLOR_BLEND_COLOR1} " +
        "%1 %{BKY_COLOR_BLEND_COLOR2} %2 %{BKY_COLOR_BLEND_RATIO} %3",
    "args0": [
      {
        "type": "input_value",
        "name": "COLOR1",
        "check": "Color",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "COLOR2",
        "check": "Color",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "RATIO",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "output": "Color",
    "helpUrl": "%{BKY_COLOR_BLEND_HELPURL}",
    "style": "colour_blocks",
    "tooltip": "%{BKY_COLOR_BLEND_TOOLTIP}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
