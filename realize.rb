require 'uri'

ARGV.each do |x|
  url = URI(x)
  next if !url or url.scheme == 'data'
  system("curl #{url} > #{url.path.gsub(?/, ?_)}");
end
