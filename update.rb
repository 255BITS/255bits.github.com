#!/bin/env ruby
require 'fileutils'

def cp(a, b)
  FileUtils.cp(a, b)
  puts "Copying #{a} to #{b}"
end

cp("../poly-image-reader/example.html", "./poly-image-reader-example.html")
cp("../poly-image-reader/poly-image-reader.js", "./poly-image-reader.js")
