using System;
using System.Collections.Generic;

public class VietnameseToBConverter
{
    private Dictionary<char, string> conversionMap;

    public VietnameseToBConverter()
    {
        InitializeConversionMap();
    }

    private void InitializeConversionMap()
    {
        conversionMap = new Dictionary<char, string>
        {
            {'à', "a"}, {'á', "a"}, {'ả', "a"}, {'ã', "a"}, {'ạ', "a"},
            {'ă', "a"}, {'ằ', "a"}, {'ắ', "a"}, {'ẳ', "a"}, {'ẵ', "a"}, {'ặ', "a"},
            {'â', "a"}, {'ầ', "a"}, {'ấ', "a"}, {'ẩ', "a"}, {'ẫ', "a"}, {'ậ', "a"},
            {'đ', "d"}, {'Đ', "D"},
            {'è', "e"}, {'é', "e"}, {'ẻ', "e"}, {'ẽ', "e"}, {'ẹ', "e"},
            {'ê', "e"}, {'ề', "e"}, {'ế', "e"}, {'ể', "e"}, {'ễ', "e"}, {'ệ', "e"},
            {'ì', "i"}, {'í', "i"}, {'ỉ', "i"}, {'ĩ', "i"}, {'ị', "i"},
            {'ò', "o"}, {'ó', "o"}, {'ỏ', "o"}, {'õ', "o"}, {'ọ', "o"},
            {'ô', "o"}, {'ồ', "o"}, {'ố', "o"}, {'ổ', "o"}, {'ỗ', "o"}, {'ộ', "o"},
            {'ơ', "o"}, {'ờ', "o"}, {'ớ', "o"}, {'ở', "o"}, {'ỡ', "o"}, {'ợ', "o"},
            {'ù', "u"}, {'ú', "u"}, {'ủ', "u"}, {'ũ', "u"}, {'ụ', "u"},
            {'ư', "u"}, {'ừ', "u"}, {'ứ', "u"}, {'ử', "u"}, {'ữ', "u"}, {'ự', "u"},
            {'ỳ', "y"}, {'ý', "y"}, {'ỷ', "y"}, {'ỹ', "y"}, {'ỵ', "y"},
        };
    }

    public string Convert(string input)
    {
        char[] characters = input.ToCharArray();
        for (int i = 0; i < characters.Length; i++)
        {
            if (conversionMap.ContainsKey(characters[i]))
            {
                characters[i] = conversionMap[characters[i]][0];
            }
        }
        return new string(characters);
    }
}
