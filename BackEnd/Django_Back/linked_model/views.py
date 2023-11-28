from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from .serializers import TextSerializer
import glob
import os

from Model.main import *
from Model.model import *
from Model.pdf import *

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        serializer = FileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            directory_path = '/Users/ho/hufs/4-2/capStone/Project/media/'

            # 디렉토리 내 파일 목록 가져오기
            file_list = glob.glob(directory_path + '*')

            # 가장 최신 파일 찾기
            latest_file = max(file_list, key=os.path.getmtime)

            print("가장 최신 파일 경로:", latest_file)
            # 모델 pdf 경로 설정
            set_pdf_path(latest_file)
            global chain
            chain = make_chain()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TextUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TextSerializer(data=request.data)

        if serializer.is_valid():
            text_data = serializer.validated_data['text']
            s = SentencePredictor(chain)
            model_output =  s.predict_sentence(text_data)
            processed_text = f"Received text: {text_data}"
            return Response({'message': model_output}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)