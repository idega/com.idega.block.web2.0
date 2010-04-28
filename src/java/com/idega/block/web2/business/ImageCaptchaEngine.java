package com.idega.block.web2.business;

import java.awt.Font;

import com.idega.idegaweb.IWMainApplication;
import com.idega.idegaweb.IWMainApplicationSettings;
import com.octo.captcha.component.image.backgroundgenerator.BackgroundGenerator;
import com.octo.captcha.component.image.backgroundgenerator.FunkyBackgroundGenerator;
import com.octo.captcha.component.image.color.RandomRangeColorGenerator;
import com.octo.captcha.component.image.fontgenerator.FontGenerator;
import com.octo.captcha.component.image.fontgenerator.RandomFontGenerator;
import com.octo.captcha.component.image.textpaster.RandomTextPaster;
import com.octo.captcha.component.image.textpaster.TextPaster;
import com.octo.captcha.component.image.wordtoimage.ComposedWordToImage;
import com.octo.captcha.component.image.wordtoimage.WordToImage;
import com.octo.captcha.component.word.wordgenerator.RandomWordGenerator;
import com.octo.captcha.component.word.wordgenerator.WordGenerator;
import com.octo.captcha.engine.image.ListImageCaptchaEngine;
import com.octo.captcha.image.gimpy.GimpyFactory;

public class ImageCaptchaEngine extends ListImageCaptchaEngine {

	private static final String PROPERTY_NUMBER_OF_LETTERS = "captcha.number.of.letters";
	private static final String PROPERTY_IMAGE_WIDTH = "captcha.image.width";
	private static final String PROPERTY_IMAGE_HEIGHT = "captcha.image.height";
	private static final String PROPERTY_MINIMUM_FONT_SIZE = "captcha.minimum.font.size";
	private static final String PROPERTY_MAXIMUM_FONT_SIZE = "captcha.maximum.font.size";

	protected void buildInitialFactories() {
		IWMainApplicationSettings settings = IWMainApplication.getDefaultIWApplicationContext().getApplicationSettings();
		int numberOfLetters = Integer.parseInt(settings.getProperty(PROPERTY_NUMBER_OF_LETTERS, String.valueOf(7)));
		int imageWidth = Integer.parseInt(settings.getProperty(PROPERTY_IMAGE_WIDTH, String.valueOf(200)));
		int imageHeight = Integer.parseInt(settings.getProperty(PROPERTY_IMAGE_HEIGHT, String.valueOf(100)));
		int minFontSize = Integer.parseInt(settings.getProperty(PROPERTY_MINIMUM_FONT_SIZE, String.valueOf(20)));
		int maxFontSize = Integer.parseInt(settings.getProperty(PROPERTY_MAXIMUM_FONT_SIZE, String.valueOf(35)));

		WordGenerator wgen = new RandomWordGenerator("ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789");
		RandomRangeColorGenerator cgen = new RandomRangeColorGenerator(new int[] { 0, 100 }, new int[] { 0, 100 }, new int[] { 0, 100 });
		TextPaster textPaster = new RandomTextPaster(new Integer(numberOfLetters), new Integer(numberOfLetters), cgen, true);

		BackgroundGenerator backgroundGenerator = new FunkyBackgroundGenerator(new Integer(imageWidth), new Integer(imageHeight));

		Font[] fontsList = new Font[] { new Font("Arial", 0, 10), new Font("Tahoma", 0, 10), new Font("Verdana", 0, 10), };

		FontGenerator fontGenerator = new RandomFontGenerator(new Integer(minFontSize), new Integer(maxFontSize), fontsList);

		WordToImage wordToImage = new ComposedWordToImage(fontGenerator, backgroundGenerator, textPaster);
		this.addFactory(new GimpyFactory(wgen, wordToImage));
	}
}